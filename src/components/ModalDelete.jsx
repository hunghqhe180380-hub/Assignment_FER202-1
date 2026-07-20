import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = ({ isOpenModalDelete, setIsOpenModalDelete, contactsRaw, selectedDelete, setReload }) => {

    const handleDelete = async () => {
        const user = JSON.parse(localStorage.getItem("user"))
        const newContacts = contactsRaw.filter((contact) => contact.id !== selectedDelete.id);

        // Lấy thùng rác hiện tại và thêm liên hệ đã xóa vào
        const resTrash = await axios.get(`http://localhost:9999/trash/${user.id}`)
        const trashData = resTrash.data.data || []
        const deletedContact = {
            ...selectedDelete,
            deletedAt: new Date().toISOString()
        }

        await Promise.all([
            axios.patch(`http://localhost:9999/trash/${user.id}`, {
                data: [...trashData, deletedContact]
            }),
            axios.patch(`http://localhost:9999/contacts/${user.id}`, {
                data: newContacts
            })
        ])

        setReload((prev) => prev + 1)
        setIsOpenModalDelete((prev) => !prev)
    }

    return (
        <Modal
            show={isOpenModalDelete}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Xác nhận xóa liên hệ khỏi danh bạ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 className='text-danger'>Bạn có chắc chắn không?</h4>
                Liên hệ sẽ được chuyển vào thùng rác.
                <div className='fw-bold'>Bạn có thể khôi phục lại sau.</div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => setIsOpenModalDelete(false)} className='btn btn-outline-dark'>Hủy</button>
                <button onClick={() => handleDelete()} className='btn btn-outline-danger'>Tiếp tục</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDelete
