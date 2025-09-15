
export default async (req, res) => {
  try {
   
    return res.status(200).json();

  } catch (exception) {
   
    return res.status(500).json();
  }
};
