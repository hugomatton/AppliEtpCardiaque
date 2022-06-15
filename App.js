import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import CompetencesOverviewScreen from './screens/CompetencesOverviewScreen';
import CompetenceDetailScreen from './screens/CompetencesDetailScreen';
import QuizzScreen from './screens/QuizzScreen';
import FeedBackQuizzScreen from './screens/FeedBackQuizzScreen';

import { GlobalStyles } from './constants/styles';
import CompetencesContextProvider from './store/competences-context';
import NotionsContextProvider from './store/notions-context';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <NotionsContextProvider>
        <CompetencesContextProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="CompetencesOverview"
                component={CompetencesOverviewScreen}
                options={{
                  title: 'Bienvenue sur éducoeur',
                  headerTintColor: GlobalStyles.colors.secondary,
                  headerStyle: { backgroundColor: GlobalStyles.colors.main }
                }}
              />
              <Stack.Screen
                name="CompetenceDetail"
                component={CompetenceDetailScreen}
                options={{
                  headerTintColor: GlobalStyles.colors.secondary,
                  headerStyle: { backgroundColor: GlobalStyles.colors.main }

                }}
              />
              <Stack.Screen
                name='quizz'
                component={QuizzScreen}
                options={{
                  title: 'Quiz',
                  presentation: 'modal',
                  headerTintColor: GlobalStyles.colors.secondary,
                  headerStyle: { backgroundColor: GlobalStyles.colors.main }
                }}
              />
              <Stack.Screen
                name='quizzFeedBack'
                component={FeedBackQuizzScreen}
                options={{
                  header: () => { return null }
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </CompetencesContextProvider>
      </NotionsContextProvider>
    </>
  );
}


