import ListCard from "./ListCard"
import TableContact from "./TableContact"
import TableTrash from "./TableTrash"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import SettingProfile from "../pages/SettingProfile"

const WorkSpace = () => {
    const [searchParams] = useSearchParams()
    const tab = searchParams.get("tab")

    const [error, setError] = useState()
    const user = JSON.parse(localStorage.getItem("user"))
    // State
    const [contacts, setContacts] = useState([])
    const [trashContacts, setTrashContacts] = useState([])
    const [groups, setGroups] = useState([])
    // Tăng reload mỗi khi thêm / sửa / xóa / khôi phục / đổi yêu thích → useEffect fetch lại data
    const [reload, setReload] = useState(0)

    // Fetch data mới nhất khi reload thay đổi
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resContacts, resGroups, resTrash] = await Promise.all([
                    axios.get(`http://localhost:9999/contacts/${user.id}`),
                    axios.get('http://localhost:9999/groups'),
                    axios.get(`http://localhost:9999/trash/${user.id}`)
                ])
                setContacts(resContacts.data.data)
                setGroups(resGroups.data)
                setTrashContacts(resTrash.data.data || [])
            } catch (err) {
                setError(err.message)
                return;
            }
        }
        fetchData()
    }, [reload])

    // filter
    const [selectedGroup, setSelectedGroup] = useState('all');
    const [selectedFavourite, setSelectedFavourite] = useState('all');
    const [searchName, setSearchName] = useState('');

    const filteredContacts = contacts.filter((contact) => {
        const matchGroup = selectedGroup === 'all' || Number(contact.groupId) === Number(selectedGroup)
        const matchFavourite = selectedFavourite === 'all' || Number(contact.isFavourite) === Number(selectedFavourite)
        const matchSearch = contact.fullName.toLowerCase().includes(searchName.toLowerCase().trim()) || contact.email.toLowerCase().includes(searchName.trim().toLowerCase())
        return matchFavourite && matchGroup && matchSearch
    });
    //_____Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const CONTACTS_PER_PAGE = 10;
    const totalPage = Math.ceil(filteredContacts.length / CONTACTS_PER_PAGE)
    const itemsPagination = Array.from(
        { length: totalPage },
        ((value, index) => index + 1)
    )
    const startIndexContacts = (currentPage - 1) * CONTACTS_PER_PAGE
    const endIndexContacts = startIndexContacts + CONTACTS_PER_PAGE
    const currenContacts = filteredContacts.slice(startIndexContacts, endIndexContacts)

    //__Set current page = 1 when filter active
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedFavourite, searchName, selectedGroup])

    return (
        <div className="p-0 mt-3">
            {tab === 'contacts'
                && <>
                    {/*_________Card */}
                    <ListCard
                        contacts={contacts}
                        groups={groups}>
                    </ListCard>
                    {/*____Table Contact_____ */}
                    <TableContact
                        setReload={setReload}
                        itemsPagination={itemsPagination}
                        contacts={currenContacts}
                        contactsRaw={contacts}
                        currentPage={currentPage}
                        setContacts={setContacts}
                        setCurrentPage={setCurrentPage}
                        groups={groups}
                        selectedGroup={selectedGroup}
                        setSelectedGroup={setSelectedGroup}
                        selectedFavourite={selectedFavourite}
                        setSelectedFavourite={setSelectedFavourite}
                        searchName={searchName}
                        setSearchName={setSearchName}>
                    </TableContact>
                </>
            }
            {tab === 'trash'
                && <>
                    <TableTrash
                        trashContacts={trashContacts}
                        contactsRaw={contacts}
                        setReload={setReload}
                    />
                </>
            }
            {tab === "setting"
                && <>
                    <SettingProfile></SettingProfile>
                </>}

        </div>
    )
}

export default WorkSpace
