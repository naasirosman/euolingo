import { useEffect, useMemo, useState } from "react";
import { Image } from "expo-image";
import { Pressable, ScrollView, useWindowDimensions } from "react-native";

import { Icon } from "@/components/icons";
import { Text, View } from "@/components/themed";
import { Button } from "@/components/ui/button";
import { colors } from "@/constants/colors";
import { layouts } from "@/constants/layouts";
import { useBreakpoint } from "@/context/breakpoints";
import { useTheme } from "@/context/theme";
import { shuffleArray } from "@/lib/utils";
import { ExerciseItemProps, FlashCardExercise } from "@/types";

interface Props extends ExerciseItemProps {
  exercise: FlashCardExercise;
}

export function FlashCardItem({ exercise, onResult, onContinue }: Props) {
  const shuffled = useMemo(() => shuffleArray(exercise.words), [exercise]);

  const breakpoint = useBreakpoint();
  const {
    mutedForeground,
    muted,
    foreground,
    destructive,
    destructiveForeground,
    background,
    sucess,
    sucessForeground,
  } = useTheme();
  const window = useWindowDimensions();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (isSuccess !== null) {
      onResult(isSuccess);
    }
  }, [isSuccess]);

  const reset = () => {
    setSelectedId(null);
    setIsSuccess(null);
  };

  const onCheck = () => {
    if (selectedId !== null) {
      setIsSuccess(exercise.correctWordId === selectedId);
    }
  };

  return (
    <View
      style={{ justifyContent: "space-between", flex: 1, position: "relative" }}
    >
      <View
        style={{
          flex: 1,
          marginHorizontal: "auto",
          maxWidth: "100%",
          paddingHorizontal: layouts.padding,
        }}
      >
        <View
          style={{
            flex: 1,
            gap: layouts.padding * 2,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {exercise.question}
          </Text>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: layouts.padding,
              }}
            >
              {shuffled.map((word, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    if (isSuccess === null) {
                      setSelectedId(word.id);
                    }
                  }}
                  style={[
                    {
                      borderWidth: layouts.borderWidth,
                      borderColor: selectedId === word.id ? foreground : muted,
                      width:
                        breakpoint === "sm"
                          ? window.width / 2 - layouts.padding * 1.5
                          : 150,
                      borderRadius: layouts.padding,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: layouts.padding,
                      gap: layouts.padding,
                    },
                    selectedId === word.id &&
                      isSuccess === true && {
                        borderColor: sucessForeground,
                        backgroundColor: sucess,
                      },
                    selectedId === word.id &&
                      isSuccess === false && {
                        borderColor: destructiveForeground,
                        backgroundColor: destructive,
                      },
                  ]}
                >
                  <View
                    style={{
                      padding: layouts.padding,
                      width: "100%",
                      aspectRatio: 1,
                      backgroundColor: colors.transparent,
                    }}
                  >
                    <Image
                      source={word.image}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      {
                        fontSize: 24,
                        fontWeight: "bold",
                        color:
                          selectedId === word.id ? foreground : mutedForeground,
                      },
                      selectedId === word.id &&
                        isSuccess === true && {
                          color: sucessForeground,
                        },
                      selectedId === word.id &&
                        isSuccess === false && {
                          color: destructiveForeground,
                        },
                    ]}
                  >
                    {word.content}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          paddingVertical: layouts.padding,
          borderTopWidth: layouts.borderWidth,
          borderTopColor:
            isSuccess === null
              ? colors.transparent
              : isSuccess === true
              ? sucessForeground
              : destructiveForeground,
          paddingHorizontal: layouts.padding,
          backgroundColor:
            isSuccess === null
              ? background
              : isSuccess === true
              ? sucess
              : destructive,
        }}
      >
        {isSuccess !== null ? (
          <View
            style={{
              gap: layouts.padding,
              backgroundColor: colors.transparent,
            }}
          >
            <View
              style={{
                backgroundColor: colors.transparent,
                gap: layouts.padding,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: layouts.padding,
                  backgroundColor: colors.transparent,
                }}
              >
                <Icon
                  name={isSuccess ? "checkCircle" : "closeCircle"}
                  color={isSuccess ? sucessForeground : destructiveForeground}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: isSuccess ? sucessForeground : destructiveForeground,
                  }}
                >
                  {isSuccess ? "Excellect" : "Incorrect"}
                </Text>
              </View>
              {isSuccess === false && (
                <View
                  style={{
                    backgroundColor: colors.transparent,
                    flexDirection: "row",
                    gap: layouts.padding,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: destructiveForeground,
                    }}
                  >
                    Correct Answer:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: destructiveForeground,
                    }}
                  >
                    {
                      exercise.words.find(
                        ({ id }) => id === exercise.correctWordId
                      )?.content
                    }
                  </Text>
                </View>
              )}
            </View>
            <Button
              onPress={() => {
                reset();
                onContinue();
              }}
              viewStyle={{
                backgroundColor: isSuccess
                  ? sucessForeground
                  : destructiveForeground,
              }}
              textStyle={{
                color: isSuccess ? sucess : destructive,
              }}
            >
              Continue
            </Button>
          </View>
        ) : (
          <Button disabled={selectedId === null} onPress={onCheck}>
            Check
          </Button>
        )}
      </View>
    </View>
  );
}