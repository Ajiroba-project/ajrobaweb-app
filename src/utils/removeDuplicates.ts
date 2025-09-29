// Utility function to remove duplicate beneficiaries based on number and biller combination

interface BeneficiaryItem {
  biller: string;
  number: any;
}

interface TransformedBeneficiary {
  id: number;
  number: any;
  type: string;
  icon: any;
}

// Normalize phone numbers to handle variations like "07037495325" vs "7037495325"
const normalizePhoneNumber = (number: string): string => {
  // Remove all non-digit characters
  const digits = number.replace(/\D/g, '');
  
  // Handle Nigerian phone numbers
  if (digits.startsWith('234')) {
    // Remove country code and add leading zero
    return '0' + digits.substring(3);
  } else if (digits.startsWith('0')) {
    // Already has leading zero
    return digits;
  } else if (digits.length === 10) {
    // Add leading zero if missing
    return '0' + digits;
  }
  
  return digits;
};

// Normalize biller names to handle case variations
const normalizeBillerName = (biller: string): string => {
  const trimmed = biller.trim().toUpperCase();
  
  // Map common variations to standard names (all keys are uppercase since we already converted)
  const billerMap: Record<string, string> = {
    'MTN': 'MTN',
    'AIRTEL': 'AIRTEL',
    'GLO': 'GLO',
    '9MOBILE': '9MOBILE',
    'NINEMOBILE': '9MOBILE',
    'GOTV': 'GOTV',
    'DSTV': 'DSTV',
    'SHOWMAX': 'SHOWMAX',
    'STARTIME': 'STARTIME',
    'CONSAT TV': 'CONSAT TV',
  
  };
  
  return billerMap[trimmed] || trimmed;
};

export const removeDuplicateBeneficiaries = (
  data: BeneficiaryItem[] | undefined,
  iconMap: Record<string, any>
): TransformedBeneficiary[] => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  // Create a Set to track unique combinations of normalized number and biller
  const seen = new Set<string>();
  const uniqueData: BeneficiaryItem[] = [];

  // Filter out duplicates based on normalized number + biller combination
  data.forEach((item) => {
    const normalizedNumber = normalizePhoneNumber(String(item.number));
    const normalizedBiller = normalizeBillerName(item.biller);
    const key = `${normalizedNumber}-${normalizedBiller}`;
    
    if (!seen.has(key)) {
      seen.add(key);
      uniqueData.push(item);
    }
  });



  // Transform the unique data
  return uniqueData.map((item: BeneficiaryItem, index: number) => {
    const billerUpper = normalizeBillerName(item.biller);
    return {
      id: index + 1,
      number: item.number,
      type: billerUpper,
      icon: iconMap[billerUpper] || null,
    };
  });
};
