import { View, StyleSheet, Modal } from 'react-native';
import { Button } from '@rneui/themed';
import { useState } from 'react';

const ModalError: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const closeModal = (): void => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          Opps... Something went wrong
          <Button title="Close" onPress={closeModal} />
        </View>
      </View>
    </Modal>
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
