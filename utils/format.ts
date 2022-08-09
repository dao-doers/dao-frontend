type Details = {
  title: string;
  description: string;
};

export default function getFormattedDetailsFromOnchainDetailsString(details: string): Details {
  let text = details;

  if (text.includes('\n')) {
    text = text.replace(/\n/g, '\\n');
  }

  try {
    const parsedJSON = JSON.parse(text);

    return {
      title: parsedJSON.title,
      description: parsedJSON.description,
    };
  } catch (error) {
    return {
      title: '',
      description: `Can't parse proposal details. Please read it in block explorer.`,
    };
  }
}
