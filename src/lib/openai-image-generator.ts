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
    if (!process.env.OPENAI_API_KEY) {
      return {
        success: false,
        title: spec.title,
        description: "Missing OPENAI_API_KEY in server environment",
        fileUrl: "",
        generatedAt: now,
        styleApplied: spec.style || "openai_gpt_image_1"
      };
    }
    const basePrompt = `${spec.prompt}\nBrand: e& (Etisalat). Professional B2B hero visual. Color accent: #e30613. Clean grid, generous whitespace, corporate aesthetic, sharp icons, realistic lighting.`;
    try {
      let res = await client.images.generate({
        model: "gpt-image-1",
        prompt: basePrompt,
        size: "512x512"
      });

      const item = res.data?.[0] || {} as any;
      const b64 = item.b64_json as string | undefined;
      const url = item.url as string | undefined;

      if (b64) {
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

      if (url) {
        return {
          success: true,
          title: `${spec.title}`,
          description: `Generated image URL via OpenAI gpt-image-1 for ${spec.industry}`,
          fileUrl: url,
          generatedAt: now,
          styleApplied: spec.style || "openai_gpt_image_1"
        };
      }

      // Retry with dall-e-3 if gpt-image-1 returned nothing
      try {
        res = await client.images.generate({
          model: "dall-e-3",
          prompt: basePrompt,
          size: "512x512"
        });
        const retryItem = res.data?.[0] || {} as any;
        const retryB64 = retryItem.b64_json as string | undefined;
        const retryUrl = retryItem.url as string | undefined;
        if (retryB64) {
          const dataUrl = `data:image/png;base64,${retryB64}`;
          return {
            success: true,
            title: `${spec.title}`,
            description: `Generated PNG via OpenAI dall-e-3 for ${spec.industry}`,
            fileUrl: dataUrl,
            generatedAt: now,
            styleApplied: spec.style || "openai_dall_e_3"
          };
        }
        if (retryUrl) {
          return {
            success: true,
            title: `${spec.title}`,
            description: `Generated image URL via OpenAI dall-e-3 for ${spec.industry}`,
            fileUrl: retryUrl,
            generatedAt: now,
            styleApplied: spec.style || "openai_dall_e_3"
          };
        }
      } catch {}

      return {
        success: false,
        title: spec.title,
        description: "OpenAI Images returned no data",
        fileUrl: "",
        generatedAt: now,
        styleApplied: spec.style || "openai_gpt_image_1"
      };
    } catch (err: any) {
      const msg = typeof err?.message === 'string' ? err.message : 'Unknown error';
      return {
        success: false,
        title: spec.title,
        description: `OpenAI error: ${msg}`,
        fileUrl: "",
        generatedAt: now,
        styleApplied: spec.style || "openai_gpt_image_1"
      };
    }
  }
}

export const openAIImageGenerator = new OpenAIImageGenerator();


