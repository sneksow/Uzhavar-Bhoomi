// Sample data for milestone 1. Every screen reads from this module so a later
// milestone can swap these exports for real database / API calls.

export type CategoryId =
  | 'dairy'
  | 'poultry'
  | 'vegetables'
  | 'fruits'
  | 'millets'
  | 'spices'
  | 'cereals'
  | 'oils'
  | 'flowers'
  | 'nuts'
  | 'dried'
  | 'greens'

export interface Category {
  id: CategoryId
  name: string
  tamil: string
  image: string
}

export const categories: Category[] = [
  { id: 'vegetables', name: 'Vegetables', tamil: 'காய்கறிகள்', image: '/img/vegetables.jpg' },
  { id: 'fruits', name: 'Fruits', tamil: 'பழங்கள்', image: '/img/fruits.jpg' },
  { id: 'greens', name: 'Greens', tamil: 'கீரைகள்', image: '/img/greens.jpg' },
  { id: 'millets', name: 'Millets', tamil: 'சிறுதானியங்கள்', image: '/img/millets.jpg' },
  { id: 'cereals', name: 'Cereals & Pulses', tamil: 'தானியங்கள் & பருப்பு', image: '/img/cereals.jpg' },
  { id: 'dairy', name: 'Dairy Products', tamil: 'பால் பொருட்கள்', image: '/img/dairy.jpg' },
  { id: 'poultry', name: 'Poultry', tamil: 'முட்டைகள்', image: '/img/poultry.jpg' },
  { id: 'spices', name: 'Spices', tamil: 'மசாலா', image: '/img/spices.jpg' },
  { id: 'oils', name: 'Oil Varieties', tamil: 'எண்ணெய்', image: '/img/oils.jpg' },
  { id: 'flowers', name: 'Flowers', tamil: 'பூக்கள்', image: '/img/flowers.jpg' },
  { id: 'nuts', name: 'Nuts & Seeds', tamil: 'கொட்டைகள்', image: '/img/nuts.jpg' },
  { id: 'dried', name: 'Dried Fruits', tamil: 'உலர் பழங்கள்', image: '/img/dried.jpg' },
]

export interface Product {
  id: string
  name: string
  local: string
  category: CategoryId
  unit: string
  /** Fair farm-gate price paid by the customer, ₹ */
  price: number
  /** Typical retail price through middlemen, ₹ */
  marketPrice: number
  emoji: string
  farmer: string
  village: string
  tags: string[]
  image:string
}

type Row = [name: string, local: string, unit: string, price: number, emoji: string, tags?: string[],image:string]

const farmers: [string, string][] = [
  ['Murugan K.', 'Thanjavur, TN'],
  ['Lakshmi Devi', 'Mandya, KA'],
  ['Ravi Patil', 'Nashik, MH'],
  ['Selvi R.', 'Erode, TN'],
  ['Gurpreet Singh', 'Ludhiana, PB'],
  ['Anitha M.', 'Palakkad, KL'],
  ['Venkatesh Rao', 'Guntur, AP'],
  ['Kamala Bai', 'Indore, MP'],
]

const rows: Record<CategoryId, Row[]> = {
  fruits: [
    ['Mango (Alphonso)', 'மாம்பழம்', '1 kg', 140, '🥭', ['Vitamin C', 'Vitamin A'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTcMFWmUuZmEWzdE-YgGOiVLCKVb20hypeGbnD45Y6Gg&s=10'],
    ['Banana (Poovan)', 'வாழைப்பழம்', '1 dozen', 48, '🍌', ['Potassium', 'Energy'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQffw-mBRMnBeYLn_66z1vtJK6SSd7U8ZjlDAR78S0j1Ml8-uwtdERrxc&s=10'],
    ['Guava', 'கொய்யா', '1 kg', 60, '🍐', ['Vitamin C', 'Fibre', 'Diabetes-friendly'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPaCjY8CZnUDwcY1FX84WmrNQUR71EwWhS8MEsuW4JMw&s=10'],
    ['Papaya', 'பப்பாளி', '1 pc (~1.2 kg)', 45, '🍈', ['Digestion', 'Vitamin A'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-vt5qDyHohgvjiMo97vnkFT6a1KmBIFZAoY5VJPFkUg&s=10'],
    ['Pomegranate', 'மாதுளை', '1 kg', 160, '🍎', ['Iron', 'Antioxidants'],'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR2y0Lu2rO4nfchCfe2uBOArBXIq7JKv39pkEelheWReDMrqpqwoT1y_q2v-fejviWWzhaomH4q3CLDcH-cYHt7Mtdx2iVuGyFdNEqk6TH3DRbQf16nkWHxjN4ppXMw6R5tvrXw9IWaUw&usqp=CAc'],
    ['Custard Apple', 'சீதாப்பழம்', '1 kg', 120, '🍏', ['Vitamin B6', 'Energy'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktcOPtg3QMqbncp4W2Yil9Qg9-l32L_7dEbtVgcnLQA&s=10'],
    ['Indian Gooseberry (Amla)', 'நெல்லிக்காய்', '500 g', 55, '🟢', ['Vitamin C', 'Immunity', 'Diabetes-friendly'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdXGhWGNzh46aPZ4Q39SRAsIPbC1HMi0QFxOHrAqZv7g&s=10'],
    ['Chiku (Sapota)', 'சப்போட்டா', '1 kg', 70, '🥔', ['Energy', 'Fibre'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6lnK0eT1ndvl3SZdJDm9W8ehQ6L8MdncEDZVn879WQg&s'],
    ['Black Plum (Jamun)', 'நாவல் பழம்', '500 g', 90, '🫐', ['Diabetes-friendly', 'Iron'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUR9qBXrDLhtS6MViXoRMrVMoxx5Jvkv73JJzDW06bPQ&s=10'],
    ['Jackfruit', 'பலாப்பழம்', '1 kg (cut)', 80, '🍈', ['Fibre', 'Potassium'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzS4CT5wu0wjcmqu9hzLrAkV1wKUm2H6ahfpQhha9doA&s=10'],
  ],
  vegetables: [
    ['Potato', 'உருளைக்கிழங்கு', '1 kg', 32, '🥔', ['Energy'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISR3-kuZAlyso6VHEMfua76dDMxFFlR7sEQWz7ntbFA&s=10'],
    ['Onion', 'வெங்காயம்', '1 kg', 36, '🧅', ['Heart health'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_fT7vDqjYfzwihWbG651QEBGwkTT0WcfSpvm0fziFDA&s=10'],
    ['Tomato', 'தக்காளி', '1 kg', 28, '🍅', ['Lycopene', 'Vitamin C'],'https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg'],
    ["Lady's Finger (Okra)", 'வெண்டைக்காய்', '500 g', 25, '🫛', ['Fibre', 'Diabetes-friendly'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHHhU1euUIshUpXVKJDj421-4fi22Eq7XBYcfv6r-skA&s=10'],
    ['Eggplant (Brinjal)', 'கத்தரிக்காய்', '1 kg', 40, '🍆', ['Fibre', 'Low calorie'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzGUv7eLOrpol_URgpRRmnxPFTmqdGYd_NMOXsAuA01A&s'],
    ['Cauliflower', 'காலிஃபிளவர்', '1 pc', 35, '🥦', ['Vitamin K', 'Low calorie'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaxqV3kbkpHn7pBZQCs9pyRBTTrCW73Bb3Nx1Vjo1mww&s'],
    ['Cabbage', 'முட்டைக்கோஸ்', '1 pc', 30, '🥬', ['Vitamin K',''],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_bNQ0m9fkvl5f4-KX4X6AZ5s2Ytsy8g0LzwufvsmxdA&s=10'],
    ['Green Peas', 'பச்சை பட்டாணி', '500 g', 45, '🫛', ['Protein', 'Fibre'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs9GWvCO0twajo1A4uwmI7SXRfK5qakj2nKpb7T9sZ0_Vumh7rB8JrXaFE&s=10'],
    ['Spinach', 'பசலைக்கீரை', '1 bunch', 20, '🥬', ['Iron', 'Folate'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ8XDcsA2Pa1cVTbAvzzCpja7EHX8rDY6JS1XjqMDYnQ&s=10'],
    ['Fenugreek Leaves', 'வெந்தயக்கீரை', '250 g', 40, '🌰', ['Diabetes-friendly', 'Digestion'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxlrrezoKl199DqPUmlstXIOiFk-e0_UrtMHctHRJDA&s=10'],
    ['Coriander Leaves', 'கொத்தமல்லி', '1 bunch', 10, '🌿', ['Vitamin K', 'Detox'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqQgyvMV1_PNTNJfJX_1s-JRZHEQ9E-r4VHp-9BdSvug&s'],
    ['Radish', 'முள்ளங்கி', '1 kg', 30, '🥕', ['Digestion', 'Low calorie'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGlXbpkEcmrdmDq9QimsPFNtvOEzNsCBOX2Tpxmoh9Wg&s=10'],
    ['Carrot', 'கேரட்', '1 kg', 50, '🥕', ['Vitamin A', 'Eye health'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5EmJpCKPBYyiNeWj1qA-TD_FpveXnU6XNxhnpoVHBsw&s'],
    ['Beetroot', 'பீட்ரூட்', '1 kg', 45, '🟣', ['Iron', 'Blood pressure'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxMN71AIsjZ77G50GJmGHdo8G3YEg9RFg3CHQJlL5T8Q&s=10'],
    ['Bottle Gourd', 'சுரைக்காய்', '1 pc', 30, '🥒', ['Hydration', 'Weight loss'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKy2v3wNGzVIvGZ-jApSI_4NyokcdOG69OtGsq4b-Mnw&s=10'],
    ['Ridge Gourd', 'பீர்க்கங்காய்', '500 g', 28, '🥒', ['Fibre', 'Diabetes-friendly'],'https://organicbazar.net/cdn/shop/products/Untitled-design-6.jpg?v=1759748393&width=1445'],
    ['Sweet Potato', 'சர்க்கரைவள்ளிக்கிழங்கு', '1 kg', 48, '🍠', ['Vitamin A', 'Fibre'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxv2mwBsrtXkh0aeCWKiQm9q_v2tnR41h-QMWH52Ht0DXHCaZnIgFAhC8&s=10'],
    ['Taro Root (Arbi)', 'சேப்பங்கிழங்கு', '500 g', 35, '🥔', ['Fibre', 'Potassium'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCuSRxg8lJXEm297Rm9Ib0mPZZlQ5bCXYxYHhtJcpwfg&s=10'],
  ],
  cereals: [
    ['Ponni Rice', 'பொன்னி அரிசி', '5 kg', 290, '🍚', ['Energy'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdnfXNZjLogyjzDRctDtji7ekTWLgHaVUjc_Dbtt83WQ&s=10'],
    ['Mapillai Samba Red Rice', 'மாப்பிள்ளை சம்பா', '1 kg', 110, '🍚', ['Fibre', 'Iron', 'Diabetes-friendly'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQVtkZVnWOPes5L6NM-d6H-ihiRKrL1wNmf6h3gueexg&s=10'],
    ['Whole Wheat', 'கோதுமை', '5 kg', 240, '🌾', ['Fibre', 'Protein'],'https://m.media-amazon.com/images/I/714xCG6CxKL._AC_UF1000,1000_QL80_.jpg'],
    ['Toor Dal', 'துவரம் பருப்பு', '1 kg', 135, '🫘', ['Protein'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbh_KDQPXxHYvCm6F3JTXmBEwcHqS9-_nIRTGrkduIdCO4t_jBRfUnyX0&s=10'],
    ['Moong Dal', 'பாசிப் பருப்பு', '1 kg', 125, '🫘', ['Protein', 'Easy digestion'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMZNRZmSBCW9TLDHteVQyEDJ7SCsmTnQ_Tttvo__GnZQ&s=10'],
  ],
  millets: [
    ['Finger Millet (Ragi)', 'கேழ்வரகு', '1 kg', 70, '🌾', ['Calcium', 'Diabetes-friendly'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCcq9HwuH6x7EE3nrTr_eABZd6Q5wbGZ9G8he-VezQA&s=10'],
    ['Pearl Millet (Bajra)', 'கம்பு', '1 kg', 60, '🌾', ['Iron', 'Diabetes-friendly'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhyiaXXYP5J4ZQCo9ASSCk46DwkQkMm9UP47LtHOQccQ&s=10'],
    ['Sorghum (Jowar)', 'சோளம்', '1 kg', 65, '🌾', ['Fibre', 'Gluten-free'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBqsfMFdnR8vaLFV6g2Gi-lDyAa1JX6TWx1mu-29IRHw&s=10'],
    ['Little Millet', 'சாமை', '1 kg', 110, '🌾', ['Fibre', 'Diabetes-friendly'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzVlU-8SYfHLSGCMKEBWg8aynENbzsEcauUHWxCwc8bA&s=10'],
    ['Foxtail Millet', 'தினை', '1 kg', 105, '🌾', ['Low GI', 'Diabetes-friendly'],'https://wisemama.in/cdn/shop/articles/FoxtailMillet.webp?v=1741263141&width=600'],
    ['Kodo Millet', 'வரகு', '1 kg', 115, '🌾', ['Antioxidants', 'Diabetes-friendly'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxV6CQ4Tg9i58w5Z8-gELzUSlcBVnlaizT_sQrC4O5eQ&s=10'],
    ['Barnyard Millet', 'குதிரைவாலி', '1 kg', 120, '🌾', ['Iron', 'Low calorie'],'https://ueirorganic.com/cdn/shop/files/BarnyardMillet.jpg?v=1689338419'],
  ],
  poultry: [
    ['Quail Eggs', 'காடை முட்டை', '12 pcs', 72, '🥚', ['Protein', 'Vitamin B12'],'https://www.bbassets.com/media/uploads/p/l/40328710_1-prakrithi-quail-eggs.jpg'],
    ['Country Chicken Eggs', 'நாட்டுக்கோழி முட்டை', '6 pcs', 66, '🥚', ['Protein', 'Omega-3'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm9KFZFMEXrzHa_1LkOT_pcFU4r4kYC8GT3qo7XjbWXw&s=10'],
    ['Duck Eggs', 'வாத்து முட்டை', '6 pcs', 90, '🥚', ['Protein', 'Iron'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWjOt7iiVZEMzFhIk_9iCYBMwq0k4QMT4A4UzZHn_fIA&s=10'],
  ],
  dairy: [
    ['Fresh Paneer', 'பனீர்', '200 g', 85, '🧀', ['Protein', 'Calcium'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhQMpuycK7ApcMd7o-3v31Ok5oghzS3R8koISoJ-vIiMq2luMuLDaSB7Gt&s=10'],
    ['A2 Cow Milk', 'பசும்பால்', '1 L', 60, '🥛', ['Calcium', 'Protein'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nFAGSIYWLMVvF99A9HlU6itTzEj4BrNO3ONc4RTJ0A&s=10'],
    ['Thick Curd', 'தயிர்', '500 g', 40, '🥣', ['Probiotic', 'Gut health'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrTy985GJc9b6vutM5-mKrXoskX5ItANt7MBcYN5cg8A&s=10'],
    ['Farm Cheese', 'சீஸ்', '200 g', 160, '🧀', ['Calcium', 'Protein'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiyBcD5RK-ARfEqRMflzFrLebcdSITK3zz43gA4zajmQ&s=10'],
  ],
  nuts: [
    ['Almonds (Badam)', 'பாதாம்', '250 g', 230, '🌰', ['Vitamin E', 'Heart health'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgNaWjuueUkCpDAGYhaKUYYwXq01vgi2Uy5-jotlG34g&s=10'],
    ['Cashews (Kaju)', 'முந்திரி', '250 g', 240, '🥜', ['Magnesium', 'Energy'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtapmY1forqL6vh7bF9HK1azwWRMfUAip0kvPpkrL4g&s=10'],
    ['Walnuts (Akhrot)', 'அக்ரூட்', '250 g', 280, '🌰', ['Omega-3', 'Brain health'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Hc8Y74dvjeirJfq7OVsNtcVece_CqGCeUJHn2OEEDA&s=10'],
    ['Pistachios (Pista)', 'பிஸ்தா', '250 g', 320, '🥜', ['Protein', 'Heart health'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTnDvSKk96fIlMsJSMDg6baWkkiB1Sgqa3-_kh60ixAQ&s=10'],
    ['Hazelnuts', 'ஹேசல்நட்', '200 g', 360, '🌰', ['Vitamin E'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAPmB-F6rQPKc8zbb4gLkV667HG2vKHiffAriyL7RPXA&s=10'],
    ['Brazil Nuts', 'பிரேசில் நட்', '200 g', 420, '🌰', ['Selenium', 'Thyroid'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDA7QJhJm5U4Hbt6YFsS3rrsTxvEPgePcv3dwvY_FqJTRJsAu4erkMnVs&s=10'],
    ['Macadamia Nuts', 'மக்காடாமியா', '200 g', 480, '🌰', ['Healthy fats'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS77WzXLH5vW185QuMyfzFTkJSzWHMSQuXFLF9t81bMSQ&s=10'],
    ['Pine Nuts (Chilgoza)', 'சில்கோசா', '100 g', 390, '🌰', ['Iron', 'Zinc'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAI6WqOraRCTFIypGFBzq72yWD06vOxdTDX2qHNYhx1A&s=10'],
    ['Peanuts', 'நிலக்கடலை', '500 g', 75, '🥜', ['Protein', 'Energy'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOXOJnzFB2R55Zv6q3pqkkM9VHeXwEqTly5a2sfmnImX-AlU8usRaoMLOb&s=10'],
  ],
  dried: [
    ['Raisins (Kishmish)', 'உலர் திராட்சை', '250 g', 95, '🍇', ['Iron', 'Energy'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIPr4ZccI6M3suGgGbb3vDTuDS5T-D4St1pZqTLKXdzO4jwDteZ-uC7F35&s=10'],
    ['Dates (Khajoor)', 'பேரீச்சம்பழம்', '500 g', 180, '🌴', ['Iron', 'Energy'],'https://assets.bonappetit.com/photos/5aa97b1e7b904f1c0e1c36ee/4:3/w_7409,h_5556,c_limit/Basically_Medjool-Dates.jpg'],
    ['Dried Figs (Anjeer)', 'அத்திப்பழம்', '250 g', 260, '🟤', ['Fibre', 'Calcium'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCy3VZksY0w-ZO5MUCj66E724dXtOv03jv0-6q72QmaA&s=10'],
    ['Dried Apricots (Jardalu)', 'உலர் ஆப்ரிகாட்', '250 g', 240, '🟠', ['Vitamin A', 'Iron'],'https://www.bbassets.com/media/uploads/p/l/20001095_16-fresho-apricot-dried.jpg'],
    ['Prunes (Dried Plums)', 'உலர் பிளம்', '250 g', 280, '🟣', ['Fibre', 'Digestion'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEQqFu5SrdpAcCjmFMaSc8OQKSclcABwo7y1XA3WhawA&s=10'],
    ['Dried Cranberries', 'உலர் கிரான்பெர்ரி', '200 g', 230, '🔴', ['Antioxidants'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBAvQbth4KhQYCbXd0YVFexHIKlRvYk1CbOjwAvWCCDQ&s=10'],
    ['Dried Blueberries', 'உலர் புளூபெர்ரி', '150 g', 340, '🫐', ['Antioxidants', 'Brain health'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlBBjWA3yQaBLYFQC5lN02fTOzmm-kwr_zBEl02qV7fw&s=10'],
    ['Dried Goji Berries', 'கோஜி பெர்ரி', '150 g', 320, '🔴', ['Immunity', 'Vitamin A'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStV6M5Ew_SmvaC6xEbKSSscxXQhdOYv_1SUDreDT36VQ&s=10'],
    ['Dried Cherries', 'உலர் செர்ரி', '150 g', 310, '🍒', ['Antioxidants', 'Sleep'],'https://m.media-amazon.com/images/I/81+jjxm0jrL.jpg'],
  ],
  greens: [
    ['Spinach (Palak)', 'பசலைக்கீரை', '1 bunch', 20, '🥬', ['Iron', 'Folate'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmuJQwrIGIdoFFsQAWeTRsBfK90a_8S8rVidM_03A1HA&s=10'],
    ['Fenugreek Leaves (Methi)', 'வெந்தயக்கீரை', '1 bunch', 15, '🌿', ['Diabetes-friendly', 'Iron'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSN6ZIKGBYVgi3aCAlap_89KlPMx058Cy_46GwrflQUI47_fhTmsZP9rE&s=10'],
    ['Amaranth Leaves (Chaulai)', 'முளைக்கீரை', '1 bunch', 15, '🌿', ['Iron', 'Calcium'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTuNqdMSMldKl8YUf4KwrmVOqMucqUxBMMGYlLqlq7pA&s=10'],
    ['Mustard Greens (Sarson)', 'கடுகுக்கீரை', '1 bunch', 25, '🥬', ['Vitamin K', 'Vitamin C'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-IUHHokvN4JUvVC1K3Sf5fuhxitIlsV84k6_ri25SrA&s=10'],
    ['Kale', 'கேல்', '250 g', 60, '🥬', ['Vitamin K', 'Antioxidants'],'https://www.google.com/imgres?q=kale&imgurl=https%3A%2F%2Fcdn.britannica.com%2F74%2F181374-050-83F7B492%2Fkale-leaves.jpg&imgrefurl=https%3A%2F%2Fwww.britannica.com%2Fplant%2Fkale&docid=eXxObDoyrHmgWM&tbnid=98TKLchFAYX1KM&vet=12ahUKEwiwm_LTj5uXAxWDSWwGHTrsDLcQnPAOegQIThAA..i&w=1600&h=1067&hcb=2&ved=2ahUKEwiwm_LTj5uXAxWDSWwGHTrsDLcQnPAOegQIThAA'],
    ['Collard Greens', 'காலார்டு கீரை', '250 g', 50, '🥬', ['Calcium', 'Fibre'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFj9LNk0fS9PjYzw6uyWZJPlHDj1frK-qTKy6lp_Bt1g&s=10'],
    ['Malabar Spinach (Basale)', 'பசலை', '1 bunch', 20, '🌿', ['Iron', 'Vitamin A'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Gswo6gfwDxhrRIY378op4IoUgxnS57xeFux4s2BXbw&s=10'],
    ['Swiss Chard', 'சுவிஸ் சார்டு', '250 g', 55, '🥬', ['Magnesium', 'Vitamin K'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMHyGoVJW1Ve7rL6JxJdf4FNDwZxTot6pSBl1v-769jQ&s=10'],
    ['Bok Choy', 'போக் சோய்', '250 g', 50, '🥬', ['Vitamin C', 'Calcium'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNaR-geOg_70y_qXCb2X5LhvdcWW5LIBZCn2wOA_NRIg&s=10'],
    ['Cabbage Leaves', 'முட்டைக்கோஸ் இலை', '500 g', 20, '🥬', ['Gut health'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7zfkZlHJeaONExKm5rG7IYs5ft5edtCYv3ysvnnXZPw&s=10'],
    ['Drumstick Leaves (Moringa)', 'முருங்கைக்கீரை', '1 bunch', 15, '🌿', ['Iron', 'Calcium', 'Immunity'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrI-eoMwZs2HJ5almv99tUELjG5SypNcHPtvFOezfO-g&s=10'],
    ['Colocasia Leaves (Arbi)', 'சேப்பங்கிழங்கு இலை', '1 bunch', 20, '🍃', ['Vitamin A', 'Fibre'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwwDK0oPzkYX0G-9YVa7ngp3uLdttA47tBqGK3_SfkBg&s=10'],
    ['Gongura (Sorrel Leaves)', 'புளிச்சகீரை', '1 bunch', 18, '🍃', ['Iron', 'Vitamin C'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRomLJf6TK1nndkYznsIy_LtGbjV0Bn8THH6QD0G0t5QQ&s=10'],
    ['Parsley', 'பார்ஸ்லி', '100 g', 40, '🌿', ['Vitamin K', 'Detox'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNvcgl4wpeqH17g_guEWsI4Tg8OEIrjlGbu18RSk-AVQ&s=10'],
    ['Basil Leaves (Tulsi)', 'துளசி', '100 g', 30, '🌿', ['Immunity', 'Respiratory health'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEW8df5gfCfhlHazBG5xdzoVs_yTIh0ngiYqgpmUxIoA&s=10'],
  ],
  spices: [
    ['Erode Turmeric', 'மஞ்சள்', '250 g', 70, '🟡', ['Anti-inflammatory', 'Immunity'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsqMBzVXIJlJGXYQH9NoY5NvSt4dH1yHduALFFI-pLEQ&s=10'],
    ['Black Pepper', 'மிளகு', '100 g', 90, '⚫', ['Digestion', 'Immunity'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3K3BJJchyZsYgzYjK36k3ifrSBoJan3Fl56YeKB5Ew&s=10'],
    ['Green Cardamom', 'ஏலக்காய்', '50 g', 150, '🟢', ['Digestion'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSMfSOfpq3CYjIJWSefPABvyWK_d2Pw8jf-s6NhLg1L10GuzhnwWMlcZIxl2KdP9mFB8ESrTMmD5LmmlygE7x3h3KDLHs&s=10'],
    ['Guntur Red Chilli', 'மிளகாய்', '250 g', 85, '🌶️', ['Metabolism'],'https://m.media-amazon.com/images/I/51L0Mg0ouDL._AC_UF894,1000_QL80_.jpg'],
    ['Cumin Seeds', 'சீரகம்', '200 g', 80, '🟤', ['Digestion'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHlr68hvuZdi55oB4GaVdYsJMN2FVQb-2rgYK91cj1C5SayFYU9Al1-Gr0&s=10'],
  ],
  oils: [
    ['Cold-Pressed Groundnut Oil', 'கடலை எண்ணெய்', '1 L', 260, '🫗', ['Heart health'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL1Y1BcV1rVDr2FOgk25CXhN5aXmIlT8GRHNY6BpDCGw&s=10'],
    ['Cold-Pressed Gingelly Oil', 'நல்லெண்ணெய்', '1 L', 390, '🫗', ['Antioxidants', 'Heart health'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQInPwSjbF-qnPTe5slKikDA4HkgymShKn_5xC1wkgNRN8tRhy6n6lRfddb&s=10'],
    ['Virgin Coconut Oil', 'தேங்காய் எண்ணெய்', '1 L', 340, '🥥', ['MCT', 'Skin health'],'https://cpimg.tistatic.com/10394205/b/4/Organic-Coconut-Oil-..jpg'],
    ['Mustard Oil', 'கடுகு எண்ணெய்', '1 L', 220, '🫗', ['Omega-3'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25psevqxtqkvTnHZDpzy0qhtWnsF9gTnCozx5xH4YZA&s=10'],
  ],
  flowers: [
    ['Madurai Jasmine (Malli)', 'மதுரை மல்லி', '1 mozham string', 40, '🤍', ['Pooja', 'Fragrance'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZER4TVLVj7-lwSXLQMrM_GgwoeNM5SnbKPFz5nafu1A&s=10'],
    ['Marigold', 'செவ்வந்தி', '500 g', 60, '🌼', ['Pooja', 'Garland'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBq63gx7djc_eo3CMbvedQ27taVsaF1jEy9wtnDM1MyQ&s=10'],
    ['Country Roses', 'ரோஜா', '250 g', 70, '🌹', ['Pooja', 'Fragrance'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1YPgoYGSKj7JJUktxCldReSSpaIFjdJndcQqY-WyXpg&s=10'],
    ['Lotus', 'தாமரை', '5 stems', 75, '🪷', ['Pooja'],'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRakV06b-bT47Iovk7swsXOTSXfKx9Iq99sq_mPeERhUA&s=10'],
  ],
}

export const products: Product[] = Object.entries(rows).flatMap(([category, list], ci) =>
  list.map(([name, local, unit, price, emoji, tags = [],image], i) => {
    const [farmer, village] = farmers[(ci * 3 + i) % farmers.length]
    // Middlemen typically add 35–70% on top of the farm-gate price.
    const markup = 1.35 + ((ci + i * 7) % 8) * 0.05
    return {
      id: `${category}-${i}`,
      name,
      local,
      category: category as CategoryId,
      unit,
      price,
      marketPrice: Math.round((price * markup) / 5) * 5,
      emoji,
      farmer,
      village,
      tags,
      image,
    }
  }),
)

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  CategoryId,
  Category
>

/* ------------------------------------------------------------------ */
/* Agri-Buddy sample knowledge — replaced by Gemini in a later milestone */
/* ------------------------------------------------------------------ */

export interface BuddyAnswer {
  text: string
  productIds: string[]
}

const byName = (part: string) =>
  products.filter((p) => p.name.toLowerCase().includes(part.toLowerCase())).map((p) => p.id)

const buddyRules: { match: RegExp; answer: () => BuddyAnswer }[] = [
  {
    match: /diabet|sugar|glucose|நீரிழிவு|சர்க்கரை|मधुमेह|शुगर/i,
    answer: () => ({
      text: 'For blood-sugar control, swap polished rice for low-GI millets like foxtail (thinai), kodo (varagu) and little millet (samai) a few times a week. Add fibre-rich vegetables such as ridge gourd and okra, soaked fenugreek seeds in the morning, and jamun or guava as fruit. Today\'s fair rates are 20–40% below city retail.',
      productIds: [...byName('Foxtail'), ...byName('Kodo'), ...byName('Little Millet'), ...byName('Fenugreek Seeds'), ...byName('Jamun'), ...byName('Ridge')],
    }),
  },
  {
    match: /iron|anaemi|anemi|haemoglobin|hemoglobin|இரத்த சோகை|खून की कमी/i,
    answer: () => ({
      text: 'For iron deficiency, drumstick leaves (moringa) are one of the richest plant sources — cook them with dal twice a week. Pair greens with vitamin-C foods like amla or lemon to boost absorption. Beetroot, pomegranate, dates and bajra are also great everyday options.',
      productIds: [...byName('Moringa'), ...byName('Amaranth'), ...byName('Amla'), ...byName('Beetroot'), ...byName('Dates'), ...byName('Bajra')],
    }),
  },
  {
    match: /bone|calcium|joint|எலும்பு|हड्डी/i,
    answer: () => ({
      text: 'For strong bones, ragi is the calcium champion among grains — try ragi porridge or dosa. Add curd, paneer, amaranth greens and dried figs to your week.',
      productIds: [...byName('Ragi'), ...byName('Curd'), ...byName('Paneer'), ...byName('Amaranth'), ...byName('Figs')],
    }),
  },
  {
    match: /heart|cholesterol|bp|blood pressure|இதய|दिल/i,
    answer: () => ({
      text: 'For heart health, use cold-pressed gingelly or groundnut oil in moderation, a handful of walnuts or almonds daily, and potassium-rich foods like banana and beetroot. Keep salt low and add plenty of greens.',
      productIds: [...byName('Gingelly'), ...byName('Walnuts'), ...byName('Almonds'), ...byName('Banana'), ...byName('Beetroot')],
    }),
  },
  {
    match: /immun|cold|cough|fever|சளி|காய்ச்சல்|सर्दी/i,
    answer: () => ({
      text: 'To build immunity, amla is packed with vitamin C. Add turmeric and black pepper to warm milk, tulsi tea, and seasonal fruits like guava and pomegranate.',
      productIds: [...byName('Amla'), ...byName('Turmeric'), ...byName('Pepper'), ...byName('Tulsi'), ...byName('Guava')],
    }),
  },
  {
    match: /weight|fat|slim|எடை|वजन/i,
    answer: () => ({
      text: 'For healthy weight loss, choose high-fibre, low-calorie produce: bottle gourd, cabbage, cauliflower and barnyard millet keep you full longer. Swap fried snacks for roasted peanuts in small portions.',
      productIds: [...byName('Bottle Gourd'), ...byName('Barnyard'), ...byName('Cauliflower'), ...byName('Cabbage')],
    }),
  },
  {
    match: /price|rate|cost|cheap|விலை|दाम|कीमत/i,
    answer: () => ({
      text: 'Today\'s fair farm-gate rates: tomato ₹28/kg, onion ₹36/kg, potato ₹32/kg — about 35–50% lower than typical city retail, and the farmer keeps the full amount. Greens start at ₹15 a bunch.',
      productIds: [...byName('Tomato'), ...byName('Onion'), ...byName('Potato')],
    }),
  },
]

export function sampleBuddyAnswer(question: string): BuddyAnswer {
  const rule = buddyRules.find((r) => r.match.test(question))
  if (rule) return rule.answer()
  return {
    text: 'I can suggest farm-fresh foods for health goals (diabetes, iron deficiency, heart health, immunity, weight loss) and tell you today\'s fair rates. Try asking: "What should I eat for diabetes?"',
    productIds: [],
  }
}

export const buddySuggestions = [
  'What should I eat for diabetes?',
  'Foods for iron deficiency',
  'Today\'s vegetable prices',
  'Heart-healthy diet plan',
]

/* ------------------------------------------------------------------ */
/* Farmer dashboard sample data                                        */
/* ------------------------------------------------------------------ */

export interface Crop {
  id: string
  name: string
  emoji: string
  field: string
  acres: number
  sownOn: string // ISO date
  durationDays: number
  litresPerDay: number
}

const daysAgo = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

export const sampleCrops: Crop[] = [
  { id: 'c1', name: 'Paddy (Ponni)', emoji: '🌾', field: 'North field', acres: 2, sownOn: daysAgo(64), durationDays: 135, litresPerDay: 1800 },
  { id: 'c2', name: 'Tomato', emoji: '🍅', field: 'Plot B', acres: 0.5, sownOn: daysAgo(48), durationDays: 75, litresPerDay: 600 },
  { id: 'c3', name: 'Finger Millet (Ragi)', emoji: '🌾', field: 'East strip', acres: 1, sownOn: daysAgo(20), durationDays: 110, litresPerDay: 350 },
  { id: 'c4', name: 'Drumstick (Moringa)', emoji: '🌿', field: 'Boundary', acres: 0.25, sownOn: daysAgo(160), durationDays: 180, litresPerDay: 150 },
]

export const tank = {
  name: 'Rainwater harvesting tank',
  capacityLitres: 60000,
  currentLitres: 38400,
  lastRefill: daysAgo(6),
  // Stored volume for the last 7 days, oldest first.
  history: [44100, 43200, 41900, 40800, 42600, 39500, 38400],
}

export interface IrrigationZone {
  id: string
  name: string
  crop: string
  flowLpm: number
  moisture: number
}

export const irrigationZones: IrrigationZone[] = [
  { id: 'z1', name: 'Zone 1 · North field', crop: 'Paddy', flowLpm: 40, moisture: 62 },
  { id: 'z2', name: 'Zone 2 · Plot B drip', crop: 'Tomato', flowLpm: 12, moisture: 34 },
  { id: 'z3', name: 'Zone 3 · East strip', crop: 'Ragi', flowLpm: 18, moisture: 48 },
]

export interface Reminder {
  id: string
  zone: string
  time: string
  repeat: string
}

export const sampleReminders: Reminder[] = [
  { id: 'r1', zone: 'Zone 2 · Plot B drip', time: '06:00', repeat: 'Daily' },
  { id: 'r2', zone: 'Zone 1 · North field', time: '17:30', repeat: 'Alternate days' },
]

export interface SecurityAlert {
  id: string
  camera: string
  kind: string
  severity: 'high' | 'medium' | 'low'
  minutesAgo: number
  confidence: number
}

export const sampleAlerts: SecurityAlert[] = [
  { id: 'a1', camera: 'Cam 2 · East fence', kind: 'Wild boar detected near ragi strip', severity: 'high', minutesAgo: 4, confidence: 94 },
  { id: 'a2', camera: 'Cam 1 · Main gate', kind: 'Unknown person at gate', severity: 'medium', minutesAgo: 52, confidence: 81 },
  { id: 'a3', camera: 'Cam 3 · Plot B', kind: 'Peacock flock in tomato plot', severity: 'low', minutesAgo: 190, confidence: 88 },
]

export const cameras = [
  { id: 'cam1', name: 'Cam 1 · Main gate', image: '/img/hero.jpg', position: 'object-left' },
  { id: 'cam2', name: 'Cam 2 · East fence', image: '/img/farmer.jpg', position: 'object-right' },
  { id: 'cam3', name: 'Cam 3 · Plot B', image: '/img/vegetables.jpg', position: 'object-center' },
]

export interface ForecastDay {
  day: string
  icon: 'sun' | 'cloud-sun' | 'cloud' | 'rain' | 'storm'
  high: number
  low: number
  rainMm: number
  rainChance: number
}

export const weather = {
  location: 'Thanjavur, Tamil Nadu',
  now: { temp: 31, feelsLike: 35, humidity: 72, windKmh: 14, condition: 'Partly cloudy', icon: 'cloud-sun' as const },
  forecast: [
    { day: 'Today', icon: 'cloud-sun', high: 33, low: 25, rainMm: 0, rainChance: 15 },
    { day: 'Fri', icon: 'cloud', high: 32, low: 25, rainMm: 2, rainChance: 35 },
    { day: 'Sat', icon: 'rain', high: 29, low: 24, rainMm: 18, rainChance: 80 },
    { day: 'Sun', icon: 'storm', high: 28, low: 23, rainMm: 34, rainChance: 90 },
    { day: 'Mon', icon: 'rain', high: 29, low: 24, rainMm: 9, rainChance: 60 },
    { day: 'Tue', icon: 'cloud-sun', high: 31, low: 24, rainMm: 1, rainChance: 20 },
    { day: 'Wed', icon: 'sun', high: 33, low: 25, rainMm: 0, rainChance: 10 },
  ] satisfies ForecastDay[],
  advisories: [
    'Heavy rain expected Sat–Sun: pause irrigation from Friday evening and let the tank refill.',
    'Clear field drainage channels in the North paddy field before Saturday.',
    'Postpone pesticide spraying on tomato until Tuesday — rain will wash it off.',
  ],
}
