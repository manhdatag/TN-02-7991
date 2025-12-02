import React, { useState } from 'react';
import { MathProblem } from '../types';
import { Button } from './Button';
import { CheckCircle, XCircle, ArrowRight, HelpCircle } from 'lucide-react';

interface QuizScreenProps {
  problem: MathProblem;
  onNext: () => void;
  onBack: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ problem, onNext, onBack }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionClick = (index: number) => {
    if (!isSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const isCorrect = selectedOption === problem.correctAnswerIndex;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 w-full animate-fade-in pb-20">
      {/* Header / Navigation */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="text-sm px-2">
          ← Quay lại
        </Button>
        <span className="text-teal-600 font-semibold text-sm bg-teal-100 px-3 py-1 rounded-full">
          Câu hỏi AI
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-teal-900/5 border border-white/50 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-relaxed mb-8">
          {problem.question}
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-4">
          {problem.options.map((option, index) => {
            let containerClass = "border-2 border-gray-100 hover:border-teal-200 hover:bg-teal-50/30";
            let indicatorClass = "bg-gray-100 text-gray-500 group-hover:bg-teal-100 group-hover:text-teal-600";
            
            // Selection state before submission
            if (!isSubmitted && selectedOption === index) {
              containerClass = "border-teal-500 bg-teal-50 ring-1 ring-teal-500";
              indicatorClass = "bg-teal-500 text-white";
            }

            // After submission
            if (isSubmitted) {
              if (index === problem.correctAnswerIndex) {
                 containerClass = "border-green-500 bg-green-50 ring-1 ring-green-500";
                 indicatorClass = "bg-green-500 text-white";
              } else if (index === selectedOption && index !== problem.correctAnswerIndex) {
                 containerClass = "border-red-500 bg-red-50 ring-1 ring-red-500";
                 indicatorClass = "bg-red-500 text-white";
              } else {
                 containerClass = "border-gray-100 opacity-60";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={isSubmitted}
                className={`group relative flex items-center p-4 rounded-xl text-left transition-all duration-200 ${containerClass}`}
              >
                <span className={`w-8 h-8 flex items-center justify-center rounded-lg mr-4 font-bold text-sm transition-colors ${indicatorClass}`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-800 font-medium text-lg">{option}</span>
                
                {isSubmitted && index === problem.correctAnswerIndex && (
                  <CheckCircle className="absolute right-4 text-green-500 w-6 h-6" />
                )}
                {isSubmitted && index === selectedOption && index !== problem.correctAnswerIndex && (
                  <XCircle className="absolute right-4 text-red-500 w-6 h-6" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Bar or Explanation */}
      {!isSubmitted ? (
        <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center pointer-events-none">
             <div className="max-w-3xl w-full pointer-events-auto">
                <Button 
                    fullWidth 
                    onClick={handleSubmit} 
                    disabled={selectedOption === null}
                    className="shadow-xl"
                >
                    Kiểm tra đáp án
                </Button>
            </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in-up">
          <div className={`rounded-2xl p-6 ${isCorrect ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
              <div>
                <h3 className={`text-lg font-bold mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Chính xác!' : 'Chưa chính xác'}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {isCorrect ? 'Bạn đã làm rất tốt.' : 'Đừng lo, hãy xem lời giải chi tiết bên dưới.'}
                </p>
                
                <div className="bg-white/60 rounded-xl p-4 border border-black/5">
                    <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        <HelpCircle className="w-4 h-4" />
                        Giải thích chi tiết
                    </div>
                    <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                        {problem.explanation}
                    </p>
                </div>
              </div>
            </div>
          </div>

          <Button 
            fullWidth 
            onClick={onNext}
            className="flex items-center justify-center gap-2 shadow-lg"
          >
            Câu hỏi tiếp theo <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};