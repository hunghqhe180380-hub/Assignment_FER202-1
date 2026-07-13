import { Card, Table } from "react-bootstrap"
import ListCard from "./ListCard"
import TableContact from "./TableContact"
import { useAsyncError, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const WorkSpace = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const tab = searchParams.get("tab")

    const [error, setError] = useState()
    const user = JSON.parse(localStorage.getItem("user"))
    // State
    const [contacts, setContacts] = useState([])
    const [groups, setGroups] = useState([])
    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resContacts, resGroups] = await Promise.all([
                    axios.get(`http://localhost:9999/contacts?userId=${user.id}`),
                    axios.get('http://localhost:9999/groups')
                ])
                setContacts(resContacts.data[0].data)
                setGroups(resGroups.data)
            } catch (err) {
                setError(err.message)
                return;
            }
        }
        fetchData()
    }, [])

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
    // console.log(selectedFavourite)
    // console.log(selectedGroup)
    // console.log(searchName)
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
                        contacts={filteredContacts}
                        groups={groups}
                        selectedGroup={selectedGroup}
                        setSelectedGroup={setSelectedGroup}
                        selectedFavourite={selectedFavourite}
                        setSelectedFavourite={setSelectedFavourite}
                        searchName={searchName}
                        setSearchName={setSearchName}>
                    </TableContact>
                </>}

        </div>
    )
}

export default WorkSpace