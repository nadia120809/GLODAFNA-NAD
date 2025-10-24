// src/data/vocabulary.js

// Helper untuk mengecek vokal
const VOWELS = ['a', 'i', 'u', 'e', 'o', 'é'];

/**
 * Helper function untuk "memperkaya" data kata.
 * Kita tambahkan info (metadata) yang akan jadi aturan main.
 */
const enrichWord = (word, category) => ({
  word,
  category,
  // Aturan 1: Berdasarkan huruf pertama (Vokal/Konsonan)
  startsWith: VOWELS.includes(word[0].toLowerCase()) ? 'Vokal' : 'Konsonan',
  // Aturan 2: Berdasarkan panjang kata (Pondok/Panjang)
  length: word.length <= 4 ? 'Pondok' : 'Panjang', // Pondok = Pendek, Panjang = Panjang
});

// Kumpulan Kategori Utama
export const CATEGORIES = {
  SATO: 'Sato', // Hewan
  KATUANGAN: 'Katuangan', // Makanan
  BENDA: 'Benda', // Benda
  WARNA: 'Warna', // Warna
};

// Kumpulan Aturan Main
export const RULES = {
  CATEGORY: { 
    id: 'CATEGORY', 
    text: 'Urutkeun dumasar KATEGORI:' // Urutkan berdasarkan Kategori
  },
  FIRST_LETTER: {
    id: 'FIRST_LETTER',
    text: 'Urutkeun dumasar HURUF MIMITI:', // Urutkan berdasarkan Huruf Pertama
  },
  LENGTH: { 
    id: 'LENGTH', 
    text: 'Urutkeun dumasar PANJANG KECAP:', // Urutkan berdasarkan Panjang Kata
  },
};

// Database Kosakata Sunda
export const VOCABULARY = [
  enrichWord('Ucing', CATEGORIES.SATO),
  enrichWord('Anjing', CATEGORIES.SATO),
  enrichWord('Hayam', CATEGORIES.SATO),
  enrichWord('Lauk', CATEGORIES.SATO), // Ikan
  enrichWord('Sangu', CATEGORIES.KATUANGAN), // Nasi
  enrichWord('Aci', CATEGORIES.KATUANGAN), // Tapioka
  enrichWord('Gula', CATEGORIES.KATUANGAN),
  enrichWord('Cai', CATEGORIES.KATUANGAN), // Air
  enrichWord('Meja', CATEGORIES.BENDA),
  enrichWord('Buku', CATEGORIES.BENDA),
  enrichWord('Panto', CATEGORIES.BENDA), // Pintu
  enrichWord('Motor', CATEGORIES.BENDA),
  enrichWord('Bodas', CATEGORIES.WARNA), // Putih
  enrichWord('Hideung', CATEGORIES.WARNA), // Hitam
  enrichWord('Beureum', CATEGORIES.WARNA), // Merah
  enrichWord('Héjo', CATEGORIES.WARNA), // Hijau
];