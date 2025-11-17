import { LearningProvider, useLearning } from './context/LearningContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LessonsList } from './components/LessonsList';
import { LessonDetail } from './components/LessonDetail';

const AppContent = () => {
  const { currentLesson, currentCategory } = useLearning();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex gap-8">
          <Sidebar />

          <div className="flex-1 bg-white rounded-lg shadow-md p-8 min-h-[500px]">
            {currentLesson ? (
              <LessonDetail />
            ) : currentCategory !== null ? (
              <LessonsList />
            ) : (
              <WelcomeScreen />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <LearningProvider>
      <AppContent />
    </LearningProvider>
  );
}

export default App;
