// Canvas-based image generator for reliable image creation
export interface ImageGenerationRequest {
  title: string;
  industry: string;
  elements: string[];
  branding: string;
  style: string;
}

export interface GeneratedImage {
  id: string;
  title: string;
  type: string;
  industry: string;
  fileUrl: string;
  content: string;
  generatedAt: string;
  styleUsed: string;
}

export class CanvasImageGenerator {
  private generateId(): string {
    return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async generateImage(request: ImageGenerationRequest): Promise<GeneratedImage> {
    console.log('🎨 Canvas Image Generator: Creating image for:', request.title);
    
    const canvas = this.createCanvas();
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Draw background
    this.drawBackground(ctx, canvas.width, canvas.height);
    
    // Draw header with e& branding
    this.drawHeader(ctx, canvas.width);
    
    // Draw main content area
    this.drawContentArea(ctx, canvas.width, canvas.height, request);
    
    // Draw visual elements
    this.drawVisualElements(ctx, canvas.width, canvas.height, request.elements);
    
    // Draw footer
    this.drawFooter(ctx, canvas.width, canvas.height);

    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png');
    
    const imageId = this.generateId();
    const generatedAt = new Date().toISOString();
    
    console.log('✅ Canvas Image Generator: Image created successfully');
    
    return {
      id: imageId,
      title: request.title,
      type: 'image',
      industry: request.industry,
      fileUrl: dataUrl,
      content: `Generated ${request.title} for ${request.industry} industry`,
      generatedAt,
      styleUsed: request.style || 'e& Professional'
    };
  }

  private createCanvas(): HTMLCanvasElement {
    // Create canvas element
    const canvas = document.createElement('canvas');
    return canvas;
  }

  private drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#f8f9fa');
    gradient.addColorStop(1, '#e9ecef');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  private drawHeader(ctx: CanvasRenderingContext2D, width: number): void {
    // e& header bar
    ctx.fillStyle = '#e30613';
    ctx.fillRect(0, 0, width, 80);
    
    // e& logo
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('e&', 50, 50);
    
    // Title
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText('TECH_TELECOM SOLUTIONS', 120, 50);
  }

  private drawContentArea(ctx: CanvasRenderingContext2D, width: number, height: number, request: ImageGenerationRequest): void {
    // Main content box
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e30613';
    ctx.lineWidth = 2;
    ctx.fillRect(50, 100, width - 100, height - 200);
    ctx.strokeRect(50, 100, width - 100, height - 200);
    
    // Title
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(request.title, width / 2, 150);
    
    // Industry
    ctx.font = '16px Arial, sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText(`${request.industry.toUpperCase()} BUSINESS SOLUTION`, width / 2, 180);
  }

  private drawVisualElements(ctx: CanvasRenderingContext2D, width: number, height: number, elements: string[]): void {
    const startY = 220;
    const elementWidth = 100;
    const elementHeight = 80;
    const spacing = 120;
    const startX = (width - (elements.length * spacing)) / 2;

    elements.forEach((element, index) => {
      const x = startX + (index * spacing);
      const y = startY;
      
      this.drawElement(ctx, x, y, elementWidth, elementHeight, element);
    });
  }

  private drawElement(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, element: string): void {
    // Element box
    ctx.fillStyle = '#e8f4fd';
    ctx.strokeStyle = '#e30613';
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
    
    // Draw element icon based on type
    this.drawElementIcon(ctx, x, y, width, height, element);
    
    // Element label
    ctx.fillStyle = '#e30613';
    ctx.font = 'bold 12px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.getElementLabel(element), x + width / 2, y + height + 20);
  }

  private drawElementIcon(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, element: string): void {
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    
    ctx.fillStyle = '#e30613';
    ctx.strokeStyle = '#e30613';
    ctx.lineWidth = 2;
    
    switch (element) {
      case 'office_building':
        this.drawOfficeBuilding(ctx, centerX, centerY);
        break;
      case 'network':
        this.drawNetwork(ctx, centerX, centerY);
        break;
      case 'router':
        this.drawRouter(ctx, centerX, centerY);
        break;
      case 'wifi_signal':
        this.drawWifiSignal(ctx, centerX, centerY);
        break;
      case 'server':
        this.drawServer(ctx, centerX, centerY);
        break;
      default:
        this.drawGenericIcon(ctx, centerX, centerY, element);
    }
  }

  private drawOfficeBuilding(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Building base
    ctx.fillRect(x - 20, y - 10, 40, 20);
    // Windows
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x - 15, y - 5, 6, 6);
    ctx.fillRect(x - 5, y - 5, 6, 6);
    ctx.fillRect(x + 5, y - 5, 6, 6);
  }

  private drawNetwork(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Network nodes
    const nodes = [
      { x: x - 15, y: y - 10 },
      { x: x, y: y },
      { x: x + 15, y: y - 10 },
      { x: x, y: y + 10 }
    ];
    
    // Draw connections
    ctx.strokeStyle = '#e30613';
    ctx.lineWidth = 2;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
    
    // Draw nodes
    ctx.fillStyle = '#e30613';
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  private drawRouter(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Router body
    ctx.fillRect(x - 15, y - 8, 30, 16);
    // Antenna
    ctx.strokeStyle = '#e30613';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 8);
    ctx.lineTo(x - 10, y - 15);
    ctx.moveTo(x + 10, y - 8);
    ctx.lineTo(x + 10, y - 15);
    ctx.stroke();
  }

  private drawWifiSignal(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // WiFi signal arcs
    ctx.strokeStyle = '#e30613';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y + 5, 8, 0, Math.PI, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y + 5, 12, 0, Math.PI, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y + 5, 16, 0, Math.PI, true);
    ctx.stroke();
  }

  private drawServer(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Server body
    ctx.fillRect(x - 12, y - 10, 24, 20);
    // Server details
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x - 8, y - 6, 16, 4);
    ctx.fillRect(x - 8, y, 16, 4);
    ctx.fillRect(x - 8, y + 6, 16, 4);
  }

  private drawGenericIcon(ctx: CanvasRenderingContext2D, x: number, y: number, element: string): void {
    // Generic circle with text
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(element.substring(0, 3).toUpperCase(), x, y + 3);
  }

  private getElementLabel(element: string): string {
    const labels: { [key: string]: string } = {
      'office_building': 'Office',
      'network': 'Network',
      'router': 'Router',
      'wifi_signal': 'WiFi',
      'server': 'Server'
    };
    return labels[element] || element;
  }

  private drawFooter(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    // Footer bar
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, height - 60, width, 60);
    
    // Footer text
    ctx.fillStyle = '#666666';
    ctx.font = '12px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('e& Business Solutions - Professional Visualization', width / 2, height - 30);
    ctx.fillText('Generated by Jammy AI', width / 2, height - 15);
  }
}

// Export singleton instance
export const canvasImageGenerator = new CanvasImageGenerator();
