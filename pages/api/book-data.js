import { storage } from "@/config";
import { ref, listAll } from "firebase/storage";

export default async (req, res) => {
  var { EBookUserId } = req.cookies;
  console.log(EBookUserId);

  var exists = ref(storage, `/books`);
  var news = (await listAll(exists)).prefixes;
  var checker = false;
  news.map((item) => {
    if (item._location.path_.replace("books/", "") == EBookUserId) {
      checker = true;
    }
  });

  if (checker) {
    const data = ref(storage, `/books/${EBookUserId}`);
    var bookNames = [];
    var fulldata = await listAll(data);
    fulldata.items.map((x) => {
      bookNames.push(x.name);
    });
    res.json({ message: bookNames });
  } else {
    res.status(200).send({ error: "Not Found" });
  }

  /*

  */
};
