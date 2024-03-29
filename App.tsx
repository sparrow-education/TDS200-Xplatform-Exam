import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeView } from './src/components';
import { AuthContextProvider } from './src/context';
import { useCustomFonts } from './src/hooks';
import WelcomeRoutes from './src/routes';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState<boolean>(false);
    const fontsLoaded = useCustomFonts();

    useEffect(() => {
        try {
            if (fontsLoaded) {
                setTimeout(() => {
                    setAppIsReady(true);
                }, 1500);
            }
        } catch (e) {
            console.warn(e);
        }
        // splash screen is dependent on fonts to be loaded, reconcile the dependencies.
    }, [fontsLoaded]);

    const onLayoutRootView = useCallback(async () => {
        // useCallback hook execute an async anonymous function to remove the splash screen.
        // The 'callBacker' is the anonymous async storing the promise and ready to use it when the app is ready.
        if (appIsReady) {
            console.info('App is ready, hiding splash screen');
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    // If the app is not ready, don't render anything.
    if (!appIsReady) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <SafeView onLayout={onLayoutRootView} className="flex-1">
                <AuthContextProvider>
                    <WelcomeRoutes />
                </AuthContextProvider>
            </SafeView>
        </SafeAreaProvider>
    );
}
