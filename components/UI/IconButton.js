import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function IconButton({ onPress, color, size, name }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed
          ? [styles.pressed, styles.buttonContainer]
          : styles.buttonContainer
      }
    >
      <Ionicons size={size} color={color} name={name}></Ionicons>
    </Pressable>
  );
}
export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
