import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const useDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  return windowDimensions;
};

export default useDimensions;
