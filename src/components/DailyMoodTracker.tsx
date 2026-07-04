import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface MoodTrackerProps {
  onMoodSelect?: (mood: string) => void;
}

const moods = [
  { emoji: "😢", label: "Sad", value: "sad" },
  { emoji: "😐", label: "Neutral", value: "neutral" },
  { emoji: "🙂", label: "Good", value: "good" },
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😄", label: "Excited", value: "excited" },
];

export default function DailyMoodTracker({ onMoodSelect }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    onMoodSelect?.(mood);
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#1F2E59",
          marginBottom: 12,
        }}
      >
        Daily Mood Tracker
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 12,
        }}
      >
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            onPress={() => handleMoodSelect(mood.value)}
            style={{
              alignItems: "center",
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
              backgroundColor:
                selectedMood === mood.value ? "#E8EEF8" : "transparent",
              borderWidth: selectedMood === mood.value ? 2 : 0,
              borderColor: selectedMood === mood.value ? "#5B8AC5" : "transparent",
            }}
          >
            <Text style={{ fontSize: 28, marginBottom: 4 }}>{mood.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text
        style={{
          fontSize: 12,
          color: "#666",
          textAlign: "center",
          marginTop: 4,
        }}
      >
        Tap an emoji to log your mood
      </Text>
    </View>
  );
}
