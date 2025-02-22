// bugSolution.js
import React, { useEffect, useState } from 'react';
import * as Network from 'expo-network';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        if (networkState.isConnected) {
          const response = await fetch('YOUR_API_ENDPOINT');
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || response.statusText}`);
          }
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          setError('No internet connection');
        }
      } catch (error) {
        setError(error);
        console.error('Network request error:', error);
        // Consider using a crash reporting service here (e.g., Sentry, Firebase Crashlytics)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (data) {
    return (
      <View>
        {/* Render data here */}
      </View>
    );
  }

  return <Text>No Data</Text>;
}