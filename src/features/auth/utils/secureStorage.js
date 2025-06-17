import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: "aes" }); // Encrypt with AES

export function secureSet(key, value) {
  // Always store as JSON string for consistency
  ls.set(key, JSON.stringify(value));
}

export function secureGet(key) {
  try {
    let decryptedData = ls.get(key);

    // If null/undefined/empty string → return null safely
    if (
      !decryptedData ||
      decryptedData === "null" ||
      decryptedData === "undefined"
    ) {
      return null;
    }

    // If it's a string that looks like JSON → parse it
    if (typeof decryptedData === "string") {
      try {
        return JSON.parse(decryptedData);
      } catch {
        // If not valid JSON, just return as is
        return decryptedData;
      }
    }

    // If already an object or other → return as is
    return decryptedData;
  } catch (e) {
    console.error("Decryption failed:", e);
    return null;
  }
}

export function secureRemove(key) {
  ls.remove(key);
}
