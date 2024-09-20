import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

interface iModalLoadingMsgProps {
  visible: boolean;
}

export function ModalLoadingMsg({ visible }: iModalLoadingMsgProps) {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <ThemedText style={{ color: "white" }}>
            Carregando conversa
          </ThemedText>
          <ActivityIndicator color={Colors.primaryColor} size={30} />
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
    backgroundColor: "#0000006f",
  },
  mainView: {
    backgroundColor: "#09264595",
    height: 100,
    width: 200,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
