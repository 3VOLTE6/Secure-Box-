## Overview
SecureBox is a decentralized application (DApp) designed for secure file storage. It aims to overcome the limitations of conventional cloud services by significantly enhancing user privacy and control over their data. This DApp leverages advanced technologies to provide a fully decentralized, free file storage solution that ensures high levels of security and transparency.

## Technologies Used
- React: Utilized for creating a responsive and intuitive user interface. React’s modular and reusable components streamline the development and maintenance of the front-end.
- Solidity and Truffle: These tools are used for developing and managing smart contracts, which handle file storage and retrieval operations. Solidity enables the writing of complex logic for file management, while Truffle facilitates compilation, deployment, and testing.
- Ganache: This tool simulates a local Ethereum blockchain, enabling rapid and reliable testing of smart contracts before deployment to the main network.
- Metamask and Web3.js: These are essential for blockchain interactions. Metamask manages blockchain identities and transaction approvals, while Web3.js provides the necessary tools to integrate the user interface with smart contracts.
- IPFS (InterPlanetary File System): Manages peer-to-peer file distribution. IPFS enhances data resilience and availability by distributing files across a decentralized network.

## Functionality

### File Storage
Users can upload files, which are split into blocks and distributed across the IPFS network, ensuring decentralized storage. This approach increases data security and reduces vulnerability to attacks and data loss.

### Smart Contracts
Smart contracts written in Solidity manage file storage and retrieval operations. Each transaction is recorded on the blockchain, ensuring transparency and immutability. These contracts define access permissions and conditions for file modification, providing a secure and verifiable record of all operations.

### User Interface
The interface, developed with React, integrates seamlessly with Metamask to handle blockchain transactions securely. It allows users to upload, download, and manage files efficiently, offering a smooth and interactive experience.

## Technical Details

### Security Management
The combination of IPFS for file distribution and blockchain for transaction recording ensures data protection against unauthorized access and tampering. Encryption is used during file upload and distribution, ensuring only authorized users can access the content.

### File Upload Procedure
Files are divided into small blocks, each receiving a unique identifier based on its content, which prevents duplication. These blocks are then distributed across the IPFS network, and their identifiers are recorded on the blockchain via a smart contract.

### File Retrieval Procedure
To retrieve a file, the user sends a request through the interface. The smart contract verifies the user’s permissions and, once authorized, provides the necessary block identifiers. The interface then retrieves and reassembles the blocks from the IPFS network to reconstruct the original file.

### Integration with Metamask
Metamask manages blockchain identities and facilitates secure transactions. Users must install the Metamask extension and link it to their SecureBox account. Every transaction, such as uploading or retrieving a file, requires user approval through Metamask, ensuring transaction security.
