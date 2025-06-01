import { useCoins } from '@/app/contexts/useCoins';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type MultipleChoiceQuestion = {
  type: 'multiple_choice';
  question: string;
  options: string[];
  correct: number;
};

type MultipleSelectQuestion = {
  type: 'multiple_select';
  question: string;
  options: string[];
  correct: number[];
};

type TrueFalseQuestion = {
  type: 'true_false';
  question: string;
  correct: boolean;
};

type FillInBlankQuestion = {
  type: 'fill_in_blank';
  question: string;
  correct: string;
};

type SliderQuestion = {
  type: 'slider';
  question: string;
  min: number;
  max: number;
  correct: [number, number];
};

type CategorizeQuestion = {
  type: 'categorize';
  question: string;
  categories: string[];
  items: { label: string; category: string }[];
};

type LikertScaleQuestion = {
  type: 'likert_scale';
  question: string;
  scale: string[];
};

type QuizData =
  | MultipleChoiceQuestion
  | MultipleSelectQuestion
  | TrueFalseQuestion
  | FillInBlankQuestion
  | SliderQuestion
  | CategorizeQuestion
  | LikertScaleQuestion;

const quizData: QuizData[] = [
  {
    "type": "multiple_choice",
    "question": "Which of the following is most eco-friendly for daily commuting?",
    "options": ["Car", "Bus", "Bicycle", "Motorbike"],
    "correct": 2
  },
  {
    "type": "multiple_select",
    "question": "Select all recyclable items:",
    "options": ["Plastic bottle", "Used tissue", "Glass jar", "Banana peel"],
    "correct": [0, 2]
  },
  {
    "type": "true_false",
    "question": "LED light bulbs consume more energy than incandescent bulbs.",
    "correct": false
  },
  {
    "type": "fill_in_blank",
    "question": "A ________ bag is a reusable alternative to plastic bags.",
    "correct": "cloth"
  },
  {
    "type": "slider",
    "question": "Guess how many years it takes for a plastic bottle to decompose?",
    "min": 0,
    "max": 1000,
    "correct": [400, 500]
  },
  {
    "type": "categorize",
    "question": "Drag and drop the items into the correct category.",
    "categories": ["Compost", "Recycle"],
    "items": [
      { "label": "Apple core", "category": "Compost" },
      { "label": "Newspaper", "category": "Recycle" },
      { "label": "Eggshell", "category": "Compost" },
      { "label": "Aluminum can", "category": "Recycle" }
    ]
  },
  {
    "type": "likert_scale",
    "question": "How strongly do you agree: 'I try to reduce single-use plastic in my daily life.'",
    "scale": ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"]
  }
];

type MultipleChoiceAnswer = {
  type: 'multiple_choice';
  value: number;
}

type MultipleSelectAnswer = {
  type: 'multiple_select';
  value: number[];
};

type TrueFalseAnswer = {
  type: 'true_false';
  value: boolean;
};

type FillInBlankAnswer = {
  type: 'fill_in_blank';
  value: string;
};

type SliderAnswer = {
  type: 'slider';
  value: number;
};

type CategorizeAnswer = {
  type: 'categorize';
  value: Record<string, string>;
};

type LikertScaleAnswer = {
  type: 'likert_scale';
  value: number;
};

type QuizAnswer = Record<number, MultipleChoiceAnswer | MultipleSelectAnswer | TrueFalseAnswer | FillInBlankAnswer | SliderAnswer | CategorizeAnswer | LikertScaleAnswer>;

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<QuizAnswer>({});
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const { addCoins } = useCoins();

  const progressPercentage = ((currentQuestionIndex + 1) / quizData.length) * 100;

  const handleAnswer = (answer: MultipleChoiceAnswer | MultipleSelectAnswer | TrueFalseAnswer | FillInBlankAnswer | SliderAnswer | CategorizeAnswer | LikertScaleAnswer) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: answer
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;

    quizData.forEach((question, index) => {
      if (question.type === 'multiple_choice') {
        const answer = answers[index] as MultipleChoiceAnswer | undefined;
        if (answer?.value === question.correct) score++;
      }

      if (question.type === 'multiple_select') {
        const answer = answers[index] as MultipleSelectAnswer | undefined;
        if (answer && JSON.stringify(answer.value.sort()) === JSON.stringify(question.correct.sort())) {
          score++;
        }
      }

      if (question.type === 'true_false') {
        const answer = answers[index] as TrueFalseAnswer | undefined;
        if (answer?.value === question.correct) score++;
      }

      if (question.type === 'fill_in_blank') {
        const answer = answers[index] as FillInBlankAnswer | undefined;
        if (answer?.value.toLowerCase().trim() === question.correct.toLowerCase().trim()) {
          score++;
        }
      }

      if (question.type === 'slider') {
        const answer = answers[index] as SliderAnswer | undefined;
        if (answer && answer.value >= question.correct[0] && answer.value <= question.correct[1]) {
          score++;
        }
      }

      if (question.type === 'categorize') {
        const answer = answers[index] as CategorizeAnswer | undefined;
        const isCorrect = question.items.every(item =>
          answer?.value[item.label] === item.category
        );
        if (isCorrect) score++;
      }

      if (question.type === 'likert_scale') {
        const answer = answers[index] as LikertScaleAnswer | undefined;
        if (answer) score++;
      }
    });

    setScore(score);
    addCoins({
      name: 'Quiz Completion',
      value: score,
    });
  };

  const renderMultipleChoice = (task: MultipleChoiceQuestion) => {
    const answer = answers[currentQuestionIndex] as MultipleChoiceAnswer | undefined;

    return (<View style={styles.optionsContainer}>
      {task.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            answer?.value === index && styles.selectedOption
          ]}
          onPress={() => handleAnswer({ type: 'multiple_choice', value: index })}
        >
          <Text style={[
            styles.optionText,
            answer?.value === index && styles.selectedOptionText
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>)
  };

  const renderMultipleSelect = (task: MultipleSelectQuestion) => {
    const answer = answers[currentQuestionIndex] as MultipleSelectAnswer | undefined;

    return (
      <View style={styles.optionsContainer}>
        {task.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              answer?.value.includes(index) && styles.selectedOption
            ]}
            onPress={() => {
              const newAnswers = answer?.value.includes(index)
                ? answer?.value.filter(i => i !== index)
                : [...(answer?.value || []), index];
              handleAnswer({ type: 'multiple_select', value: newAnswers });
            }}
          >
            <Text style={[
              styles.optionText,
              answer?.value.includes(index) && styles.selectedOptionText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTrueFalse = (task: TrueFalseQuestion) => {
    const answer = answers[currentQuestionIndex] as TrueFalseAnswer | undefined;

    return (
      <View style={styles.trueFalseContainer}>
        <TouchableOpacity
          style={[
            styles.trueFalseButton,
            styles.trueButton,
            answer?.value === true && styles.selectedTrueButton
          ]}
          onPress={() => handleAnswer({ type: 'true_false', value: true })}
        >
          <Text style={[
            styles.trueFalseText,
            answer?.value === true && styles.selectedTrueFalseText
          ]}>
            TRUE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.trueFalseButton,
            styles.falseButton,
            answer?.value === false && styles.selectedFalseButton
          ]}
          onPress={() => handleAnswer({ type: 'true_false', value: false })}
        >
          <Text style={[
            styles.trueFalseText,
            answer?.value === false && styles.selectedTrueFalseText
          ]}>
            FALSE
          </Text>
        </TouchableOpacity>
      </View>
    )
  };

  const renderFillInBlank = (task: FillInBlankQuestion) => {
    const answer = answers[currentQuestionIndex] as FillInBlankAnswer | undefined;

    return (
      <View style={styles.fillBlankContainer}>
        <TextInput
          style={styles.fillBlankInput}
          placeholder="Type your answer here..."
          placeholderTextColor="#A5B4A1"
          value={answer?.value || ''}
          onChangeText={(text) => handleAnswer({ type: 'fill_in_blank', value: text })}
          autoCapitalize="none"
        />
      </View>
    );
  }

  const renderSlider = (task: SliderQuestion) => {
    const answer = answers[currentQuestionIndex] as SliderAnswer | undefined;

    return (
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderValue}>
          {answer?.value || task.min} years
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={task.min}
          maximumValue={task.max}
          value={answer?.value || task.min}
          onValueChange={(value: number) => handleAnswer({ type: 'slider', value: Math.round(value) })}
          minimumTrackTintColor="#4CAF50"
          maximumTrackTintColor="#E8F5E8"
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>{task.min}</Text>
          <Text style={styles.sliderLabel}>{task.max}</Text>
        </View>
      </View>
    );
  }

  const renderCategorize = (task: CategorizeQuestion) => {
    const answer = answers[currentQuestionIndex] as CategorizeAnswer | undefined;

    return (
      <View style={styles.categorizeContainer}>
        <View style={styles.categoriesRow}>
          {task.categories.map((category, index) => (
            <View key={index} style={styles.categoryBox}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <View style={styles.categoryDropZone}>
                {task.items
                  .filter(item => answer?.value[item.label] === category)
                  .map((item, itemIndex) => (
                    <TouchableOpacity
                      key={itemIndex}
                      style={styles.categorizedItem}
                      onPress={() => {
                        const newAnswers = { ...answer?.value };
                        delete newAnswers[item.label];
                        handleAnswer({ type: 'categorize', value: newAnswers });
                      }}
                    >
                      <Text style={styles.categorizedItemText}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.itemsToCategory}>
          <Text style={styles.itemsTitle}>Drag items to categories:</Text>
          {task.items
            .filter(item => !answer?.value[item.label])
            .map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.itemLabel}>{item.label}</Text>
                <View style={styles.categoryButtons}>
                  {task.categories.map((category, catIndex) => (
                    <TouchableOpacity
                      key={catIndex}
                      style={styles.categorySelectButton}
                      onPress={() => {
                        handleAnswer({ type: 'categorize', value: { ...answer?.value, [item.label]: category } });
                      }}
                    >
                      <Text style={styles.categorySelectText}>{category}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
        </View>
      </View>
    );
  };

  const renderLikertScale = (task: LikertScaleQuestion) => {
    const answer = answers[currentQuestionIndex] as LikertScaleAnswer | undefined;

    return (
      <View style={styles.likertContainer}>
        {task.scale.map((scaleItem, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.likertButton,
              answer?.value === index && styles.selectedLikert
            ]}
            onPress={() => handleAnswer({ type: 'likert_scale', value: index })}
          >
            <Text style={[
              styles.likertText,
              answer?.value === index && styles.selectedLikertText
            ]}>
              {scaleItem}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  const renderQuestion = () => {
    const task = quizData[currentQuestionIndex];

    switch (task.type) {
      case 'multiple_choice':
        return renderMultipleChoice(task);
      case 'multiple_select':
        return renderMultipleSelect(task);
      case 'true_false':
        return renderTrueFalse(task);
      case 'fill_in_blank':
        return renderFillInBlank(task);
      case 'slider':
        return renderSlider(task);
      case 'categorize':
        return renderCategorize(task);
      case 'likert_scale':
        return renderLikertScale(task);
      default:
        return <Text>Question type not supported</Text>;
    }
  };

  const renderResults = () => (
    <View style={styles.resultsContainer}>
      <View style={styles.scoreCircle}>
        <Text style={styles.scoreNumber}>{score}</Text>
        <Text style={styles.scoreTotal}> / {quizData.length}</Text>
      </View>
      <Text style={styles.resultsTitle}>Quiz Completed!</Text>
      <Text style={styles.resultsText}>
        You scored {score} out of {quizData.length} questions correctly!
      </Text>
      <TouchableOpacity
        style={styles.restartButton}
        onPress={() => {
          setCurrentQuestionIndex(0);
          setAnswers({});
          setScore(0);
          setQuizCompleted(false);
          setShowResult(false);
        }}
      >
        <Text style={styles.restartButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  if (quizCompleted) {
    return (
      <LinearGradient colors={['#66BB6A', '#4CAF50']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {renderResults()}
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#66BB6A', '#4CAF50']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {currentQuestionIndex + 1} / {quizData.length}
            </Text>
          </View>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionNumber}>
            Question {currentQuestionIndex + 1}
          </Text>
          <Text style={styles.questionText}>
            {quizData[currentQuestionIndex].question}
          </Text>

          {renderQuestion()}
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            !answers[currentQuestionIndex] && styles.nextButtonDisabled
          ]}
          onPress={nextQuestion}
          disabled={!answers[currentQuestionIndex]}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginRight: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  questionNumber: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    color: '#2E7D32',
    fontWeight: '600',
    marginBottom: 25,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#F1F8E9',
    borderRadius: 15,
    padding: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
  },
  optionText: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  trueFalseContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  trueFalseButton: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
  },
  trueButton: {
    backgroundColor: '#E8F5E8',
    borderColor: 'transparent',
  },
  falseButton: {
    backgroundColor: '#FFEBEE',
    borderColor: 'transparent',
  },
  selectedTrueButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
  },
  selectedFalseButton: {
    backgroundColor: '#F44336',
    borderColor: '#D32F2F',
  },
  trueFalseText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2E7D32',
  },
  selectedTrueFalseText: {
    color: '#FFFFFF',
  },
  fillBlankContainer: {
    marginTop: 10,
  },
  fillBlankInput: {
    backgroundColor: '#F1F8E9',
    borderRadius: 15,
    padding: 18,
    fontSize: 16,
    color: '#2E7D32',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  sliderContainer: {
    marginTop: 20,
  },
  sliderValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  sliderThumb: {
    backgroundColor: '#4CAF50',
    width: 24,
    height: 24,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 14,
    color: '#666',
  },
  categorizeContainer: {
    gap: 20,
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  categoryBox: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    borderRadius: 12,
    padding: 12,
    minHeight: 120,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 8,
  },
  categoryDropZone: {
    flex: 1,
    gap: 6,
  },
  categorizedItem: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 8,
  },
  categorizedItemText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  itemsToCategory: {
    gap: 8,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    borderRadius: 12,
    padding: 12,
  },
  itemLabel: {
    fontSize: 14,
    color: '#2E7D32',
    flex: 1,
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  categorySelectButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categorySelectText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  likertContainer: {
    gap: 10,
  },
  likertButton: {
    backgroundColor: '#F1F8E9',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedLikert: {
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
  },
  likertText: {
    fontSize: 14,
    color: '#2E7D32',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedLikertText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  nextButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
  },
  resultsContainer: {
    alignItems: 'center',
    paddingTop: 50,
  },
  scoreCircle: {
    flex: 1,
    flexDirection: 'row',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: '#4CAF50',
  },
  scoreTotal: {
    fontSize: 24,
    color: '#666',
    marginTop: -8,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  resultsText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  restartButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  restartButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
  },
});

export default QuizScreen;