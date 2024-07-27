import * as FileSystem from 'expo-file-system';

export const loadImage = async (uri: string) => {
  const puzzleDirectory = FileSystem.cacheDirectory + 'puzzle_view/';
  if (!FileSystem.bundleDirectory?.length) {
    console.log(8, FileSystem.bundleDirectory?.length);
    return undefined;
  }
  try {
    const directorries = await FileSystem.readDirectoryAsync(puzzleDirectory);
    console.log(1, directorries);
    console.log(11);
  } catch (error) {
    console.log(2, error);
  }
  try {
    // create directory if not exists
    const dirInfo = await FileSystem.getInfoAsync(puzzleDirectory);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(puzzleDirectory, {
        intermediates: true,
      });
    }
    const imageData = await FileSystem.getContentUriAsync(
      puzzleDirectory + 'dog.jpeg',
    );
    console.log(21, imageData);
    return {
      uri: imageData,
    };
  } catch (error) {
    console.log(3, error);
  }
};
