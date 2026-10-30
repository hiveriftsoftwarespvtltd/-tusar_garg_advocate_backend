import { Injectable, Logger } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';
import { ContactsService } from '../contacts/contacts.service';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly settingsService: SettingsService,
    private readonly contactsService: ContactsService,
  ) {}

  async processChat(message: string, history: ChatMessage[] = []): Promise<{ reply: string; leadSaved?: boolean }> {
    const settings = await this.settingsService.getSettings();
    const apiKey = (settings.geminiApiKey || process.env.GEMINI_API_KEY || '').trim();

    if (apiKey) {
      try {
        const reply = await this.callGeminiApi(apiKey, message, history);
        if (reply) {
          return { reply };
        }
      } catch (err: any) {
        this.logger.error(`Gemini API call failed: ${err.message}`, err.stack);
      }
    }

    // Intelligent Legal Assistant Fallback
    const fallbackReply = this.generateLegalFallback(message);
    return { reply: fallbackReply };
  }

  private async callGeminiApi(apiKey: string, userMessage: string, history: ChatMessage[]): Promise<string> {
    const systemPrompt = `You are the official AI Legal Assistant for the Chambers of Advocate Tushar Garg, Advocate-on-Record (AOR) at the Supreme Court of India.

Chambers Overview & Capabilities:
- Advocate Tushar Garg is an Advocate-on-Record entitled to act and plead before the Supreme Court of India under the Supreme Court Rules.
- Core Practice Areas: Special Leave Petitions (SLPs under Article 136 of the Constitution), Original & Appellate Jurisdiction, Constitutional Writ Petitions (Articles 32 and 226), Transfer Petitions (civil and matrimonial disputes), Review Petitions, Commercial Arbitration, NCLAT & IBC, Criminal Defense & Bail, and Civil Appellate Litigation.
- Statutory Knowledge: Thoroughly familiar with Indian law, including the New Criminal Laws (Bharatiya Nyaya Sanhita - BNS 2023, Bharatiya Nagarik Suraksha Sanhita - BNSS 2023, Bharatiya Sakshya Adhiniyam - BSA 2023), as well as IPC, CrPC, CPC, and the Constitution of India.
- Court Directory: The website has a directory of the Supreme Court of India, all 25 High Courts, and 700+ District Courts.
- Chambers Contact: Phone: +91-7206810681, Email: advocate.tushargarg@gmail.com, Supreme Court Chambers at Tilak Marg, New Delhi.

Response Guidelines:
1. Be polite, articulate, professional, and knowledgeable.
2. Structure your answers with clear bullet points where appropriate (e.g., listing procedural steps, required documents, or legal sections).
3. Where relevant, explain Indian law accurately and simply.
4. When a user asks about filing a case, challenging a high court order, or reviewing documents, invite them to schedule a consultation with Advocate Tushar Garg or contact via WhatsApp (+91-7206810681).
5. Always end with a brief legal disclaimer:
"Disclaimer: This guidance is for general legal awareness and information only. It does not constitute formal legal advice or establish an advocate-client relationship."`;

    const contents: any[] = [];

    // System instruction passed via system_instruction or prepended to conversation
    const formattedHistory = (history || []).slice(-6).map((h) => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: [{ text: h.text }],
    }));

    contents.push(...formattedHistory);
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1000,
        topP: 0.95,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API HTTP ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const replyText = candidate?.content?.parts?.[0]?.text;

    if (!replyText) {
      throw new Error('Gemini API returned empty response structure');
    }

    return replyText;
  }

  private generateLegalFallback(message: string): string {
    const q = (message || '').toLowerCase();

    if (q.includes('slp') || q.includes('special leave petition') || q.includes('article 136') || q.includes('supreme court')) {
      return `### Special Leave Petition (SLP) under Article 136

A **Special Leave Petition (SLP)** is an extraordinary constitutional remedy before the **Supreme Court of India** to challenge final or interlocutory judgments from any High Court or Tribunal.

**Key Procedural Highlights:**
- **Limitation Period:** Must be filed within **90 days** from the date of the High Court's final order (or 60 days if certificate of fitness was refused).
- **AOR Requirement:** Only an **Advocate-on-Record (AOR)** like Advocate Tushar Garg is legally empowered to file and represent matters before the Supreme Court Registry.
- **Key Documents Required:** Certified copy of impugned judgment, trial court & appellate records, Vakalatnama, and brief list of dates.

To evaluate the merits of your case or draft an SLP, please schedule a consultation with Advocate Tushar Garg at **+91-7206810681** or email **advocate.tushargarg@gmail.com**.

*Disclaimer: This response is for legal awareness only and does not substitute for case-specific legal counsel.*`;
    }

    if (q.includes('bail') || q.includes('anticipatory') || q.includes('arrest') || q.includes('bnss') || q.includes('bns') || q.includes('fir')) {
      return `### Bail & Criminal Law Procedure (BNS & BNSS)

Under the newly enacted **Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023)** and **Bharatiya Nyaya Sanhita (BNS, 2023)**:

1. **Anticipatory Bail:**
   - Filed before the Court of Sessions or High Court when an individual apprehends arrest in a non-bailable accusation.
2. **Regular Bail:**
   - Applied for after custody has occurred, evaluating flight risk, evidence tampering, and gravity of charge.
3. **Supreme Court Bail Appeals:**
   - If bail is rejected by the High Court, an SLP (Criminal) can be filed before the Supreme Court of India.

For urgent criminal defense or bail assistance, contact our Chambers helpline directly at **+91-7206810681**.

*Disclaimer: This response is for legal awareness only.*`;
    }

    if (q.includes('court') || q.includes('district') || q.includes('high court') || q.includes('jurisdiction')) {
      return `### Indian Court Directory & Case Status

Our website features a comprehensive directory covering:
- **Supreme Court of India** (Principal seat at New Delhi)
- **All 25 High Courts** across Indian States & Union Territories
- **Over 700+ Subordinate District Courts**

You can browse any State's judicial setup directly from the [Courts Directory](/courts) or check specific district court e-Courts portals.

Would you like assistance regarding an appeal to the High Court or Supreme Court? Feel free to share your district/state!`;
    }

    if (q.includes('contact') || q.includes('appointment') || q.includes('consultation') || q.includes('phone') || q.includes('fee') || q.includes('meet')) {
      return `### Schedule a Legal Consultation

You can connect directly with the **Chambers of Advocate Tushar Garg (Advocate-on-Record, Supreme Court of India)**:

- 📞 **Chambers Helpline:** [+91-7206810681](tel:+917206810681)
- 💬 **WhatsApp Desk:** Available 24/7 via the green floating button on this page.
- ✉️ **Official Email:** advocate.tushargarg@gmail.com
- 🏛️ **Office Address:** Tilak Marg, Supreme Court of India & Kalindi Colony, New Delhi.

Please feel free to leave your contact number and brief case facts here, and our team will get back to you promptly.`;
    }

    return `Namaste! Thank you for reaching out to the Chambers of **Advocate Tushar Garg, Advocate-on-Record (AOR) at the Supreme Court of India**.

How can I assist you today?
- **Supreme Court Matters:** Special Leave Petitions (SLPs), Writ Petitions, Review & Transfer Petitions.
- **Indian Bare Acts:** Guidance on New Criminal Laws (BNS, BNSS, BSA) and constitutional provisions.
- **Court Directory:** Locate High Courts and 700+ District Courts across India.
- **Consultations:** Schedule a consultation with Advocate Tushar Garg.

Feel free to type your question, or call our Chambers directly at **+91-7206810681**.

*Disclaimer: This assistance is provided for general legal awareness.*`;
    }

  async saveChatLead(data: { name: string; phone: string; email?: string; message: string; subject?: string }) {
    return this.contactsService.create({
      name: data.name || 'Website Chat Visitor',
      email: data.email || 'chat.inquiry@website.local',
      phone: data.phone || '',
      subject: data.subject || 'Inquiry via AI Chatbot',
      message: data.message || 'Chatbot lead captured',
      status: 'PENDING',
    });
  }
}
