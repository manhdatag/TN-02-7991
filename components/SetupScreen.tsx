import React from 'react';
import { MathTopic, Difficulty, QuizSettings } from '../types';
import { Button } from './Button';
import { BookOpen, BarChart2, Hash, PenTool, PieChart, Layers } from 'lucide-react';

interface SetupScreenProps {
  onStart: (settings: QuizSettings) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [topic, setTopic] = React.useState<MathTopic>(MathTopic.ARITHMETIC);
  const [difficulty, setDifficulty] = React.useState<Difficulty>(Difficulty.EASY);

  const topics = [
    { value: MathTopic.ARITHMETIC, icon: <Hash className="w-5 h-5" />, label: "Số học" },
    { value: MathTopic.ALGEBRA, icon: <PenTool className="w-5 h-5" />, label: "Đại số" },
    { value: MathTopic.GEOMETRY, icon: <Layers className="w-5 h-5" />, label: "Hình học" },
    { value: MathTopic.CALCULUS, icon: <BarChart2 className="w-5 h-5" />, label: "Giải tích" },
    { value: MathTopic.STATISTICS, icon: <PieChart className="w-5 h-5" />, label: "Thống kê" },
  ];

  const difficulties = [
    { value: Difficulty.EASY, label: "Cơ bản", color: "bg-green-100 text-green-700 border-green-200" },
    { value: Difficulty.MEDIUM, label: "Trung bình", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    { value: Difficulty.HARD, label: "Nâng cao", color: "bg-red-100 text-red-700 border-red-200" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 animate-fade-in">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-100 text-teal-600 mb-4 shadow-inner">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MathGenius AI</h1>
        <p className="text-gray-500">Chọn chủ đề để bắt đầu luyện tập ngay</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-teal-900/5 border border-white/50 backdrop-blur-sm">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-1 h-6 bg-teal-500 rounded-full mr-2"></span>
            Chủ đề
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topics.map((t) => (
              <button
                key={t.value}
                onClick={() => setTopic(t.value)}
                className={`flex items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                  topic === t.value
                    ? 'border-teal-500 bg-teal-50/50 text-teal-700 shadow-sm'
                    : 'border-gray-100 hover:border-teal-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className={`p-2 rounded-lg mr-3 ${topic === t.value ? 'bg-teal-200 text-teal-800' : 'bg-gray-100 text-gray-500'}`}>
                  {t.icon}
                </span>
                <span className="font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
             <span className="w-1 h-6 bg-teal-500 rounded-full mr-2"></span>
            Độ khó
          </h2>
          <div className="flex gap-3">
            {difficulties.map((d) => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium border-2 transition-all ${
                  difficulty === d.value
                    ? 'border-teal-500 bg-teal-600 text-white shadow-md'
                    : 'border-gray-100 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <Button 
          fullWidth 
          onClick={() => onStart({ topic, difficulty })}
          className="text-lg shadow-teal-500/40 hover:shadow-teal-500/50"
        >
          Bắt đầu luyện tập
        </Button>
      </div>
    </div>
  );
};