import Layout from "../components/Layout"

const Index = () => (
  <Layout>
    <form action="./upload" method="post" encType="multipart/form-data">
      <input type="file" name="file" style={{ display: "inline-block" }}/>
      <button type="submit" className="btn btn-primary">นำเข้า</button>
    </form>
  </Layout>
)

export default Index
