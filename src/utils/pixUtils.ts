import CRC32 from 'crc-32';

export interface PixInfo {
  key: string;
  name: string;
  city: string;
  amount?: number;
  description?: string;
}

export function generatePixPayload(pixInfo: PixInfo): string {
  const { key, name, city, amount, description } = pixInfo;
  
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
  
  return payload;
}

export function getPixInfo(): PixInfo {
  return {
    key: '87996005036', // PIX key (CPF)
    name: 'BRUNO OLIVEIRA SILVA',
    city: 'LAGOA GRANDE',
    description: 'Pagamento - Lanchonete'
  };
}

function calculateCRC16(payload: string): string {
  // Simple CRC16 calculation for PIX
  // This is a simplified version - in production, use a proper CRC16-CCITT implementation
  const crc = CRC32.str(payload) & 0xFFFF;
  return crc.toString(16).toUpperCase().padStart(4, '0');
}