const Index = () => (
  <form action="./upload" method="post" encType="multipart/form-data">
    <input type="file" name="file"/>
    <button>Upload</button>
  </form>
)

export default Index
