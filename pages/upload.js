const Index = () => (
  <form action="./upload" method="post" encType="multipart/form-data">
    <input type="file" name="file" style={{ display: "inline-block" }}/>
    <button type="submit" className="btn btn-primary">นำเข้า</button>
  </form>
)

export default Index
