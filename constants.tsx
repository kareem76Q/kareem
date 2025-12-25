
import { Category } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'تاريخ العرب',
    imageUrl: 'https://images.unsplash.com/photo-1543269664-76ad3997d9ea?q=80&w=400&h=300&auto=format&fit=crop',
    price: 0,
    isOwned: true,
    questions: [
      { id: 'q1', text: 'من هو فاتح الأندلس؟', answer: 'طارق بن زياد', points: 200 },
      { id: 'q2', text: 'متى قامت الثورة العربية الكبرى؟', answer: '1916', points: 200 },
      { id: 'q3', text: 'أين وقعت معركة حطين؟', answer: 'فلسطين', points: 400 },
      { id: 'q4', text: 'من هو مؤسس الدولة الأموية؟', answer: 'معاوية بن أبي سفيان', points: 400 },
      { id: 'q5', text: 'ما هو أطول حصار في التاريخ الحديث؟', answer: 'حصار لينينغراد', points: 600 },
      { id: 'q6', text: 'متى تم توقيع صلح الحديبية؟', answer: '6 هـ', points: 600 },
    ]
  },
  {
    id: '2',
    name: 'كورة قدم',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&h=300&auto=format&fit=crop',
    price: 150,
    isOwned: false,
    questions: [
      { id: 'q7', text: 'من فاز بكأس العالم 2022؟', answer: 'الأرجنتين', points: 200 },
      { id: 'q8', text: 'كم عدد لاعبي فريق كرة السلة؟', answer: '5 لاعبين', points: 200 },
      { id: 'q9', text: 'من هو الهداف التاريخي للدوري الإسباني؟', answer: 'ليونيل ميسي', points: 400 },
      { id: 'q10', text: 'أين أقيمت أول دورة ألعاب أولمبية حديثة؟', answer: 'أثينا 1896', points: 400 },
      { id: 'q11', text: 'ما هو النادي الملقب بالسيدة العجوز؟', answer: 'يوفنتوس', points: 600 },
      { id: 'q12', text: 'كم مرة فاز المنتخب البرازيلي بكأس العالم؟', answer: '5 مرات', points: 600 },
    ]
  },
  {
    id: '3',
    name: 'عالم الحيوان',
    imageUrl: 'https://images.unsplash.com/photo-1474511320721-9a489726880e?q=80&w=400&h=300&auto=format&fit=crop',
    price: 100,
    isOwned: false,
    questions: Array.from({length: 6}, (_, i) => ({ id: `q3-${i}`, text: `سؤال عن الحيوانات رقم ${i+1}`, answer: 'إجابة السؤال', points: (i < 2 ? 200 : i < 4 ? 400 : 600) }))
  },
  {
    id: '4',
    name: 'مسرح الزعيم',
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=400&h=300&auto=format&fit=crop',
    price: 200,
    isOwned: false,
    questions: Array.from({length: 6}, (_, i) => ({ id: `q4-${i}`, text: `سؤال عن مسرحية رقم ${i+1}`, answer: 'إجابة السؤال', points: (i < 2 ? 200 : i < 4 ? 400 : 600) }))
  },
  {
    id: '5',
    name: 'الدوري الإنجليزي',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&h=300&auto=format&fit=crop',
    price: 250,
    isOwned: false,
    questions: Array.from({length: 6}, (_, i) => ({ id: `q5-${i}`, text: `سؤال عن البريميرليج ${i+1}`, answer: 'إجابة السؤال', points: (i < 2 ? 200 : i < 4 ? 400 : 600) }))
  },
  {
    id: '6',
    name: 'أعلام الدول',
    imageUrl: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=400&h=300&auto=format&fit=crop',
    price: 120,
    isOwned: false,
    questions: Array.from({length: 6}, (_, i) => ({ id: `q6-${i}`, text: `سؤال عن الأعلام ${i+1}`, answer: 'إجابة السؤال', points: (i < 2 ? 200 : i < 4 ? 400 : 600) }))
  }
];

export const APP_LOGO = (
  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
