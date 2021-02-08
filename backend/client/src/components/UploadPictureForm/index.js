// Fetch allows frontend to access backend
import { fetch } from '../../store/csrf';
const UploadPictureForm = () => {

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            fetch("/temp", { method: "POST" });
        }}>
            <input type="file" onChange={async (event) => {
                const rawInputElement = event.target;
                const theFileToUpload = rawInputElement.files[0];
                const formData = new FormData();

                formData.append("bubblebop", theFileToUpload);

                await fetch('/temp', {
                    method: 'POST',
                    body: formData,
                    });
            }} />
            <img alt="userPhoto" src="https://denvegfiles.s3.amazonaws.com/1609456937061.jpg" />
            <button type="submit">Submit</button>
       </form>
    );
}

export default UploadPictureForm;