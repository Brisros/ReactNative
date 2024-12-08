import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Button, Modal, Paragraph, Portal, Text, Title } from 'react-native-paper';

const ModalError: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const closeModal = (): void => {
    setModalVisible(false);
  };

  return (
    <Portal>
      <Modal
        visible={modalVisible}
        onDismiss={closeModal}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Title>Opps... Something went wrong</Title>
          <Paragraph>
            You got this Modal because there was an API error
          </Paragraph>
          <Paragraph>
            If you clicked the red button then you simulated an api error
          </Paragraph>
          <Button onPress={closeModal} mode='outlined'>Close</Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalError;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
