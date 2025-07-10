export interface PixInfo {
  key: string;
  name: string;
  city: string;
  amount?: number;
  description?: string;
}

export function generatePixPayload(pixInfo: PixInfo): string {
  try {
    const { key, name, city, amount, description } = pixInfo;
    
    console.log('Gerando payload PIX com dados:', pixInfo);
    
    // PIX payload format according to EMV specification
    let payload = '';
    
    // Payload Format Indicator
    payload += '000201';
    
    // Point of Initiation Method
    payload += '010212';
    
    // Merchant Account Information
    const pixKey = `0014br.gov.bcb.pix01${key.length.toString().padStart(2, '0')}${key}`;
    const merchantInfo = `26${pixKey.length.toString().padStart(2, '0')}${pixKey}`;
    payload += merchantInfo;
    
    // Merchant Category Code
    payload += '52040000';
    
    // Transaction Currency (BRL)
    payload += '5303986';
    
    // Transaction Amount (if provided)
    if (amount && amount > 0) {
      const amountStr = amount.toFixed(2);
      payload += `54${amountStr.length.toString().padStart(2, '0')}${amountStr}`;
    }
    
    // Country Code
    payload += '5802BR';
    
    // Merchant Name
    const merchantName = name.substring(0, 25); // Max 25 characters
    payload += `59${merchantName.length.toString().padStart(2, '0')}${merchantName}`;
    
    // Merchant City
    const merchantCity = city.substring(0, 15); // Max 15 characters
    payload += `60${merchantCity.length.toString().padStart(2, '0')}${merchantCity}`;
    
    // Additional Data Field Template (if description provided)
    if (description) {
      const desc = description.substring(0, 72); // Max 72 characters
      const additionalData = `05${desc.length.toString().padStart(2, '0')}${desc}`;
      payload += `62${additionalData.length.toString().padStart(2, '0')}${additionalData}`;
    }
    
    // CRC16 placeholder
    payload += '6304';
    
    // Calculate CRC16
    const crc = calculateCRC16(payload);
    payload += crc;
    
    console.log('Payload PIX gerado com sucesso:', payload);
    return payload;
  } catch (error) {
    console.error('Erro ao gerar payload PIX:', error);
    throw error;
  }
}

export function getPixInfo(): PixInfo {
  return {
    key: '87996005036', // PIX key (telefone)
    name: 'BRUNO OLIVEIRA ILVIA',
    city: 'LAGOA GRANDE',
    description: 'Pagamento - Lanchonete'
  };
}

// Token do Mercado Pago para integração
// IMPORTANTE: Use um token de produção válido para receber pagamentos reais
// Token de teste: TEST-8567561391111217-070803-b94ec7c4a9e0863fa676ce5f932dedda-292933048
// Para produção, substitua pelo seu token de produção do Mercado Pago
export const MERCADO_PAGO_TOKEN = 'TEST-8567561391111217-070803-b94ec7c4a9e0863fa676ce5f932dedda-292933048';

function calculateCRC16(payload: string): string {
  // Implementação simplificada do CRC16 para PIX
  // Esta é uma versão básica que funciona para a maioria dos casos
  let crc = 0xFFFF;
  
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  
  crc = crc & 0xFFFF;
  return crc.toString(16).toUpperCase().padStart(4, '0');
}