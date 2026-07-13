import AdvancedExample from "./Pagination"

const TableContact = ({ contacts,
    groups,
    selectedGroup,
    setSelectedGroup,
    selectedFavourite,
    setSelectedFavourite,
    searchName,
    setSearchName
}) => {

    const formatDate = (ISODate) => {
        const arr = ISODate.split("T")[0].split("-")
        return `${arr[2]} / ${arr[1]} / ${arr[0]}`
    }

    const formatGroup = (groupId) => {
        const nGroup = Number(groupId);
        if (nGroup === 1) return <div className="text-center text-group" style={{ background: '#e5eefe', color: '#2472ff' }}>Gia đình</div>
        if (nGroup === 2) return <div className="text-center text-group" style={{ background: '#e7f6eb', color: '#45a85c' }}>Bạn bè</div>
        if (nGroup === 3) return <div className="text-center text-group" style={{ background: '#fff1e9', color: '#fe7f2c' }}>Công việc</div>
        if (nGroup === 4) return <div className="text-center text-group" style={{ background: '#eff1f5', color: '#818aa5' }}>Khác</div>
        return <div className="text-center text-group" style={{ background: 'black', color: 'white' }}>Gia đình</div>
    }

    return (
        <div className="mt-3 p-0 work-space-contact border">
            {/* ____Filter */}
            <div className="d-flex align-item-baseline filter-space container">
                {/*____Group */}
                <div className="filter-item">
                    <select className="form-select"
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}>
                        <option value={'all'}>Tất cả nhóm</option>
                        {groups.map((gr) => <option value={gr.id}>{gr.name}</option>)}
                    </select>
                </div>
                {/*___ favourite _________ */}
                <div className="filter-item">
                    <select className="form-select"
                        value={selectedFavourite}
                        onChange={(e) => setSelectedFavourite(e.target.value)}>
                        <option value={'all'}>Tất cả</option>
                        <option value={1}>Yêu thích</option>
                        <option value={2}>Không yêu thích</option>
                    </select>
                </div>
                {/*___Search by name OR email____*/}
                <div className="filter-item">
                    <input type="text" className="form-control"
                        placeholder="Search by NAME or EMAIL"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)} />
                </div>
                {/*__Reset */}
                <div className="filter-item">
                    <button className="btn btn-danger btn-outline-black">
                        Reset  <i className="bi bi-arrow-repeat"></i>
                    </button>
                </div>
            </div>
            {/* <hr /> */}
            <div className="container">
                <table className="table table-stripped table-data mt-3">
                    <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>Họ và tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Nhóm</th>
                            <th className="text-center">Yêu thích</th>
                            <th className="text-center">Ngày tạo</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => {
                            return (
                                <tr>
                                    <td className="fw-bold">{contact.id}</td>
                                    <td>{contact.fullName}</td>
                                    <td>{contact.phoneNumber}</td>
                                    <td>{contact.email}</td>
                                    <td>{formatGroup(contact.groupId)}</td>
                                    <td className="text-center">
                                        {Number(contact.isFavourite) === 1 ? <i className="bi bi-star-fill" style={{ color: '#ffbb00' }}></i> : <i className="bi bi-star"></i>}
                                    </td>
                                    <td className="text-center">{formatDate(contact.createdAt)}</td>
                                    <td className="d-flex" >
                                        <button className="w-50 h-50 btn btn-outline-warning" style={{ color: 'black' }}>
                                            <i className="bi bi-pencil p-0"></i>
                                        </button>
                                        <button className="w-50 h-50 btn btn-outline-danger">
                                            <i className="bi bi-trash p-0"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <AdvancedExample></AdvancedExample>
            </div>
        </div>
    )
}

export default TableContact