import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

interface iModalLoadingMsgProps {
  visible: boolean;
}

export function ModalLoadingMsg({ visible }: iModalLoadingMsgProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <ThemedText style={styles.text}>Carregando conversa...</ThemedText>
          <ActivityIndicator color={Colors.primaryColor} size={40} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo mais transparente
  },
  mainView: {
    backgroundColor: "#0957a05c", // Fundo com maior transparência
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
