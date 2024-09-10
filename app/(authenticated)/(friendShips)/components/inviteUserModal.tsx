import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Dispatch, SetStateAction } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Avatar, Button, IconButton, Text } from "react-native-paper";

interface iInviteUserModalProps {
  item: any;
  visible: boolean;
  setModalUser: Dispatch<SetStateAction<boolean>>;
}

export function InviteUserModal({
  item,
  visible,
  setModalUser,
}: iInviteUserModalProps) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modalView}>
          <ThemedText type="subtitle" style={styles.modalText}>
            Deseja enviar uma solicitação para {item.username}?
          </ThemedText>

          {item.picture !== null ? (
            <Avatar.Image source={item.picture} size={200} />
          ) : (
            <Avatar.Icon icon="account" style={styles.avatarIcon} size={200} />
          )}

          <View style={styles.buttonContainer}>
            <Button
              icon={"cancel"}
              style={styles.cancelButton}
              onPress={() => setModalUser(false)}
              textColor="white"
              buttonColor="red"
              mode="contained"
            >
              Cancelar
            </Button>
            <Button
              icon={"check-bold"}
              style={styles.acceptButton}
              onPress={() => setModalUser(false)}
              textColor="white"
              mode="contained"
              buttonColor="#00e55c"
            >
              <Text variant="titleSmall" style={{ color: "white" }}>
                {" "}
                Enviar
              </Text>
            </Button>
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    gap: 20,
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  avatarIcon: {
    backgroundColor: "#2251ae",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    color: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
