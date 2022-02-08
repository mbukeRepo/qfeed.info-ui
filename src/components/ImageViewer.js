import { Modal } from 'antd';

const ImageViewer = (props) => {
  return (
      <Modal
        centered
        visible={props.visible}
        onCancel={props.toggle}
        footer={[]}
      >
        <div>
            <img src={props.docUrl} alt="" style={{width: '100%'}} />
        </div>
      </Modal>
  );
};

export default ImageViewer;