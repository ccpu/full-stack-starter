import { HomeScreen } from '@internal/app';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <HomeScreen />
    </SafeAreaView>
  );
}
