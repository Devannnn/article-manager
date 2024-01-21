import AccountsBar from "../Structure/AccountsBar";

function Dashboard() {
    return (
        <div className="container mx-3 my-4">
            <div className="d-flex">
                <div className="col-12">
                </div>
                <div className="col-2">
                    <AccountsBar />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;