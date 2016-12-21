import decamelize from 'decamelize';

const normaliseExtension = extension => (
  extension.charAt(0) === '.' ? extension : `.${extension}`
);

const blockNameFromFile = (path, inputExtension = null) => {
  const pathSegments = path.replace(/\\/g, '/').split('/');
  const lastSegment = pathSegments.pop();
  const extensionSearch = inputExtension ? normaliseExtension(inputExtension) : '.';
  const indexOfExtension = lastSegment.lastIndexOf(extensionSearch);
  const fileName = indexOfExtension >= 0 ? lastSegment.substring(0, indexOfExtension) : lastSegment;
  return decamelize(fileName, '-');
};

export default blockNameFromFile;
