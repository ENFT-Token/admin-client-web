import ReactModal from 'react-modal';
import Button from './Button';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#root');

interface IConfirmModalProps {
    content : React.ReactNode;
    open: boolean;
    yesLabel: string;
    onClose: () => void;
    onYes: () => void;
}

function ConfirmModal({content,open,onClose, yesLabel,onYes} : IConfirmModalProps) {
    return (
            <ReactModal
                isOpen={open}
                onRequestClose={onClose}
                style={customStyles}
            >
                <div style={{textAlign:"center",height:"60px",fontSize:"20px"}}>{content}</div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <Button value={yesLabel} type={"green"} onClick={onYes} width={150}height={30} />
                <Button value={"취소"} type={"black"} onClick={onClose}width={150}height={30}/>
                </div>
            </ReactModal>
    );
}
export default ConfirmModal;