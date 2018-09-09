import Link from "next/link"

const menuStyle = {
  width: "100%",
  height: 50,
  padding: 10,
  backgroundColor: "#eee",
  borderRadius: 5,
  marginBottom: 20
}

export default (props) => (
  <div style={ menuStyle }>
    <Link href={`/`}><a>นำเข้าข้อมูล</a></Link>
    <div style={{ display: "inline-block", marginLeft: 10, marginRight: 10 }}>|</div>
    <Link href={`/search`}><a>ค้นหาข้อมูล</a></Link>
  </div>
)