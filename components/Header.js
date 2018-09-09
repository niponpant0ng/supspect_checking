import Link from "next/link"

export default (props) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li>
            <Link href={`/`}><a>นำเข้าข้อมูล</a></Link>
          </li>
          <li>
            <Link href={`/search`}><a>ค้นหาข้อมูล</a></Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)