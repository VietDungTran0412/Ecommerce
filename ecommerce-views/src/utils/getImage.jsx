export async function getImage({ productId }) {
    let res ;
    await fetch(`http://localhost:8080/image/${productId}`, {
        method: 'GET'
    }).then(res => res.blob())
    .then(blob => {
        res = URL.createObjectURL(blob);
    });
    return res ? res : null;
}