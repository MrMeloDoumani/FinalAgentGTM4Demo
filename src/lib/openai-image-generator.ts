import OpenAI from "openai";

export interface OpenAIImageSpec {
  title: string;
  prompt: string;
  industry: string;
  style?: string;
}

export interface OpenAIImageResult {
  success: boolean;
  title: string;
  description: string;
  fileUrl: string; // data URL (PNG)
  generatedAt: string;
  styleApplied: string;
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export class OpenAIImageGenerator {
  async generatePng(spec: OpenAIImageSpec): Promise<OpenAIImageResult> {
    const now = new Date().toISOString();
    const basePrompt = `${spec.prompt}\nBrand: e& (Etisalat). Professional B2B hero visual. Color accent: #e30613. Clean grid, generous whitespace, corporate aesthetic, sharp icons, realistic lighting.`;

    const res = await client.images.generate({
      model: "gpt-image-1",
      prompt: basePrompt,
      size: "1024x1024",
      response_format: "b64_json"
    });

    const b64 = res.data?.[0]?.b64_json || "";
    if (!b64) {
      return {
        success: false,
        title: spec.title,
        description: "OpenAI Images returned no data",
        fileUrl: "",
        generatedAt: now,
        styleApplied: spec.style || "openai_gpt_image_1"
      };
    }

    const dataUrl = `data:image/png;base64,${b64}`;
    return {
      success: true,
      title: `${spec.title}`,
      description: `Generated PNG via OpenAI gpt-image-1 for ${spec.industry}`,
      fileUrl: dataUrl,
      generatedAt: now,
      styleApplied: spec.style || "openai_gpt_image_1"
    };
  }
}

export const openAIImageGenerator = new OpenAIImageGenerator();


