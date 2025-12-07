## 1. Codebase Structure (Legacy Java POS)

./Point-of-Sale-System-master 2/
├── Database
│ ├── Icon\015
│ ├── couponNumber.txt
│ ├── employeeDatabase.txt
│ ├── employeeLogfile.txt
│ ├── itemDatabase.txt
│ ├── rentalDatabase.txt
│ ├── returnSale.txt
│ ├── saleInvoiceRecord.txt
│ ├── temp (1).txt
│ ├── temp (2).txt
│ ├── temp (3).txt
│ ├── temp.txt
│ └── userDatabase.txt
├── Documentation
│ ├── Beta Release
│ │ ├── Beta Release.pptx
│ │ ├── Changes made from the alpha release to the beta release.docx
│ │ ├── Developer Manual.docx
│ │ ├── Icon\015
│ │ ├── Responsibility Matrix.xlsx
│ │ ├── User Manual.docx
│ │ └── WBS.png
│ ├── Construction Phase
│ │ ├── Beta Release.pptx
│ │ ├── ConstructionPhaseWBS.PNG
│ │ ├── Icon\015
│ │ ├── Report Bugs.docx
│ │ ├── Responsibility Matrix.xlsx
│ │ └── whiteBoxTest.txt.docx
│ ├── Developer Manual.docx
│ ├── Elaboration Phase
│ │ ├── Handle Return - Deployment.png
│ │ ├── HandleReturns_Activity.jpg
│ │ ├── HandleReturns_ClassDiagram.jpg
│ │ ├── HandleReturns_DomainModel.jpg
│ │ ├── HandleReturns_SystemDiagram.jpg
│ │ ├── Icon\015
│ │ ├── JPEGS
│ │ │ ├── ElaborationWBS.PNG
│ │ │ ├── Icon\015
│ │ │ ├── RM.JPG
│ │ │ ├── UserManagementActivity.jpg
│ │ │ ├── UserManagementSequence.jpg
│ │ │ ├── rentalactivity.JPG
│ │ │ ├── rentalclass.JPG
│ │ │ ├── rentalseq.JPG
│ │ │ ├── saleclass.JPG
│ │ │ ├── salesactivity.JPG
│ │ │ ├── saleseq.JPG
│ │ │ └── startupsequence.JPG
│ │ ├── Package Diagram.png
│ │ ├── Process Rental activity diagram.pdf
│ │ ├── Process Rental class diagram.pdf
│ │ ├── Process Rental domain model.pdf
│ │ ├── Process Rental sequence diagram.pdf
│ │ ├── Responsibility Matrix.xlsx
│ │ ├── SAD(2).docx
│ │ ├── SAD(3).docx
│ │ ├── SAD.docx
│ │ ├── SG Technologies - Presentation 2.pptx
│ │ ├── System Startup and Shutdown - Activity Diagram.jpg
│ │ ├── System Startup and Shutdown - Sequence Diagram.jpg
│ │ ├── sales activity.pdf
│ │ ├── sales class.pdf
│ │ ├── sales domain.pdf
│ │ └── sales sequence.pdf
│ ├── Final Release
│ │ ├── Icon\015
│ │ └── jarFile.jar
│ ├── Icon\015
│ ├── Inception Phase
│ │ ├── Business Rules.docx
│ │ ├── Glossary.docx
│ │ ├── Group Submission #1.docx
│ │ ├── Icon\015
│ │ ├── Inception Phase Presentation.pptx
│ │ ├── Inception Timeline.docx
│ │ ├── Supplementary Specification.docx
│ │ ├── Use Cases Draft.docx
│ │ ├── Vision.docx
│ │ ├── WBS-RM.xlsx
│ │ ├── WBS_Submission_1(2).xlsx
│ │ └── WBS_Submission_1.xlsx
│ ├── Responsibility Matrix.xlsx
│ └── SG technologies.docx
├── Icon\015
├── README.txt
├── SGTechnologies.jar
├── TASKS.md
├── bin
│ ├── AddEmployee_Interface.class
│ ├── Admin_Interface.class
│ ├── Cashier_Interface.class
│ ├── Employee.class
│ ├── EmployeeManagement.class
│ ├── EmployeeTest.class
│ ├── EnterItem_Interface.class
│ ├── Icon\015
│ ├── Inventory.class
│ ├── Item.class
│ ├── Login_Interface.class
│ ├── Management.class
│ ├── POH.class
│ ├── POR.class
│ ├── POS.class
│ ├── POSSystem.class
│ ├── Payment_Interface.class
│ ├── PointOfSale.class
│ ├── Register.class
│ ├── ReturnItem.class
│ ├── Transaction_Interface.class
│ └── UpdateEmployee_Interface.class
├── build
│ ├── built-jar.properties
│ ├── classes
│ │ ├── AddEmployee_Interface.class
│ │ ├── Admin_Interface.class
│ │ ├── Cashier_Interface.class
│ │ ├── Employee.class
│ │ ├── EmployeeManagement.class
│ │ ├── EnterItem_Interface.class
│ │ ├── HandleReturns.class
│ │ ├── Icon\015
│ │ ├── Inventory.class
│ │ ├── Item.class
│ │ ├── Login_Interface.class
│ │ ├── Management.class
│ │ ├── POH.class
│ │ ├── POR.class
│ │ ├── POS.class
│ │ ├── POSSystem.class
│ │ ├── Payment_Interface.class
│ │ ├── PointOfSale.class
│ │ ├── Register.class
│ │ ├── Rental.class
│ │ ├── ReturnItem.class
│ │ ├── Sale.class
│ │ ├── Transaction_Interface.class
│ │ └── UpdateEmployee_Interface.class
│ ├── empty
│ └── generated-sources
│ └── ap-source-output
├── build.xml
├── gitignore
├── manifest.mf
├── nbproject
│ ├── Icon\015
│ ├── build-impl.xml
│ ├── genfiles.properties
│ ├── private
│ │ └── private.properties
│ ├── project.properties
│ └── project.xml
├── src
│ ├── AddEmployee_Interface.class
│ ├── AddEmployee_Interface.java
│ ├── Admin_Interface.class
│ ├── Admin_Interface.java
│ ├── Cashier_Interface.class
│ ├── Cashier_Interface.java
│ ├── Employee.class
│ ├── Employee.java
│ ├── EmployeeManagement.class
│ ├── EmployeeManagement.java
│ ├── EnterItem_Interface.class
│ ├── EnterItem_Interface.java
│ ├── HandleReturns.class
│ ├── Icon\015
│ ├── Inventory.class
│ ├── Inventory.java
│ ├── Item.class
│ ├── Item.java
│ ├── Login_Interface.class
│ ├── Login_Interface.java
│ ├── Management.class
│ ├── Management.java
│ ├── POH.class
│ ├── POH.java
│ ├── POR.class
│ ├── POR.java
│ ├── POS.class
│ ├── POS.java
│ ├── POSSystem.class
│ ├── POSSystem.java
│ ├── Payment_Interface.class
│ ├── Payment_Interface.java
│ ├── PointOfSale.class
│ ├── PointOfSale.java
│ ├── Register.class
│ ├── Register.java
│ ├── Rental.class
│ ├── ReturnItem.class
│ ├── ReturnItem.java
│ ├── Sale.class
│ ├── Transaction_Interface.class
│ ├── Transaction_Interface.java
│ ├── UpdateEmployee_Interface.class
│ └── UpdateEmployee_Interface.java
├── src.zip
└── tests
├── EmployeeTest.java
└── Icon\015

19 directories, 185 files

## 2. Class Inventory & Responsibilities| Class Name | Layer / Type | Responsibility / Description | Key Methods / Notes |

Contributor 1

Class Name Layer / Type Responsibility / Description Key Methods / Notes
POSSystem Service / System Auth, session logging, temp recovery, file path config logIn, logOut, checkTemp, continueFromTemp, logInToFile, logOutToFile
PointOfSale Domain / Abstract Base Common POS workflow, cart, totals, temp file handling startNew, enterItem, updateTotal, removeItems, createTemp, detectSystem, creditCard, endPOS(abstract), deleteTempItem(abstract), retrieveTemp(abstract)
POS Domain / Concrete Sale flow: inventory decrement, invoice log, temp cleanup endPOS, deleteTempItem, retrieveTemp
POR Domain / Concrete Rental flow: adds rentals to user DB, inventory decrement endPOS, deleteTempItem, retrieveTemp
POH Domain / Concrete Return flow: computes late fees, inventory increment, updates rental status endPOS, deleteTempItem, retrieveTemp
Inventory Data / Singleton Inventory access and persistence for item and rental DBs getInstance, accessInventory, updateInventory
Management Service / Domain User/rental DB access; returns, rental updates, phone checks checkUser, createUser, addRental, getLatestReturnDate, updateRentalStatus
EmployeeManagement Service / Admin Employee CRUD backed by flat file DB getEmployeeList, add, delete, update, readFile

Contributor 2

Class Name Layer / Type Responsibility / Description Key Methods / Notes
Register App / Entry Point Main method; launches login UI main
Login\*Interface UI / Swing Auth UI; routes by role via [`POSSystem.logIn ]actionPerformed`
Admin_Interface UI / Swing Admin dashboard: employee view/CRUD, cashier view, logout actionPerformed, updateTextArea
Cashier_Interface UI / Swing Cashier dashboard: Sale/Rental/Return, temp recovery prompt actionPerformed; uses POSSystem.checkTemp[](src/POSSystem.java), []POSSystem.continueFromTemp
[`Transaction_Interface UI / Swing Transaction workflow: add/remove items, end/cancel; manages operation type and phone ][]actionPerformed, getCustomerPhone`
[`Payment_Interface UI / Swing Payment screen; cash/electronic; shows totals and return date ][]appendReturnDate`

Contributor 3

Class Name Layer / Type Responsibility / Description Key Methods / Notes
[`Item Domain / Entity Inventory item (id, name, price, amount) ][]getItemID, getItemName, getPrice, getAmount, updateAmount`
ReturnItem	Domain / Value Object	Return computation (item id, days since due)	getItemID, getDays
[`Employee Domain / Entity Employee (username, name, position, password) ][]getUsername, getName, getPosition, getPassword`, setters
EnterItem_Interface UI / Swing Dialog to add/remove items; updates cart view actionPerformed, getItemID, getAmount, disposeThis, updateTextArea

## 3. Module / Layer Grouping

### UI Layer:

Register
Login_Interface
Admin_Interface
Cashier_Interface
Transaction_Interface
Payment_Interface
AddEmployee_Interface
UpdateEmployee_Interface
EnterItem_Interface

#### Interactions:

Triggers service operations (login, transactions, employee CRUD) and passes user input to logic layer.
Receives computed results (totals, return dates, validation outcomes) for display.
Navigates between views based on role and workflow state (e.g., sale → payment).

### Service / Logic Layer:

POSSystem → auth, session logging, temp recovery
PointOfSale → abstract POS workflow, cart, totals, coupons, temp handling
POS → Sale flow, inventory updates, invoice record
POR → Rental flow, adds rentals to user DB, inventory updates
POH → Return flow, late fee calc, rental status update, return logs
EmployeeManagement → employee CRUD
Management → user/rental DB ops, return-date lookup, status updates

#### Interactions:

Implements business workflows (auth, sale/rental/return, employee management).
Coordinates data transformations and validations; calls persistence layer to read/write.
Provides stateful transaction handling and recovery hooks for UI (temp restore).

### Data Access / Persistence (flat file):

In POSSystem:
Employee logs: employeeLogfile.txt via POSSystem.logInToFile and POSSystem.logOutToFile
Temp transaction detection: temp.txt via POSSystem.checkTemp[]POSSystem.continueFromTemp
Employee DB read: employeeDatabase.txt via POSSystem.readFile
In EmployeeManagement:
Employee DB CRUD: employeeDatabase.txt with temp rewrite Database/newEmployeeDatabase.txt via EmployeeManagement.getEmployeeList[](src/EmployeeManagement.java), []EmployeeManagement.add[](src/EmployeeManagement.java), []EmployeeManagement.delete[](src/EmployeeManagement.java), []EmployeeManagement.update
In Management:
User/rental DB: userDatabase.txt via Management.checkUser[](src/Management.java), []Management.createUser[](src/Management.java), []Management.addRental[](src/Management.java), []Management.getLatestReturnDate[](src/Management.java), []Management.updateRentalStatus
In POS[](src/POS.java), []POR[](src/POR.java), []POH:
Inventory DB: itemDatabase.txt, rentalDatabase.txt via Inventory.accessInventory[](src/Inventory.java), []Inventory.updateInventory
Temp files: temp.txt via PointOfSale.createTemp[](src/PointOfSale.java), []POS.retrieveTemp[](src/POS.java), []POR.retrieveTemp[](src/POR.java), []POH.retrieveTemp
Transaction logs:
Sales: saleInvoiceRecord.txt via POS.endPOS
Returns: returnSale.txt via POH.endPOS
Coupons: couponNumber.txt via PointOfSale.coupon

#### Interactions:

Reads/writes line-based text files to persist sessions, inventory, users, rentals, and invoices.
Exposes simple IO APIs consumed by logic layer; no DB engine, relies on file parsing.
Maintains append/update semantics; temp files support transaction continuity across UI flows.

## 4. Data & File Inventory (Database/)

Database files overview
File Name Purpose / Contains Format (per line / structure) Read/Write Locations (Classes)
employeeDatabase.txt Employee records Space-separated: username position FirstName LastName password. First token is username. Names split into two tokens; no spaces inside each name token. EmployeeManagement.readFile[](src/EmployeeManagement.java), [](http://_vscodecontentref_/1)EmployeeManagement.add[](src/EmployeeManagement.java), [](http://_vscodecontentref_/2)EmployeeManagement.delete[](src/EmployeeManagement.java), [](http://_vscodecontentref_/3)EmployeeManagement.update
itemDatabase.txt Items available for sale/return inventory Space-separated: itemId itemName price amount. Parsed as integers/floats. First token is itemId. Inventory.accessInventory[](src/Inventory.java), [](http://_vscodecontentref_/5)Inventory.updateInventory, used by PointOfSale.startNew and flows POS[](src/POS.java), [](http://_vscodecontentref_/7)POH
rentalDatabase.txt Inventory context for rentals (same structure as item DB, used when renting) Same as itemDatabase: itemId itemName price amount. Inventory.accessInventory via rental flow, POR.endPOS updates inventory with takeFromInventory=true
userDatabase.txt User phone numbers and rental state Header line, then lines: phoneNumber [itemId,MM/dd/yy,returnedFlag]... Space-separated entries; each entry itemId,date,flag; flag is true/false. First token is phone. Management.checkUser[](src/Management.java), [](http://_vscodecontentref_/12)Management.createUser[](src/Management.java), [](http://_vscodecontentref_/13)Management.addRental[](src/Management.java), [](http://_vscodecontentref_/14)Management.getLatestReturnDate[](src/Management.java), [](http://_vscodecontentref_/15)Management.updateRentalStatus, used in POR.endPOS[](src/POR.java), [](http://_vscodecontentref_/16)POH.endPOS
employeeLogfile.txt Employee login/logout events Free-text lines: “Name (username position) logs into/out of POS System. Time: yyyy-MM-dd HH:mm:ss.SSS”. POSSystem.logInToFile[](src/POSSystem.java), [](http://_vscodecontentref_/18)POSSystem.logOutToFile
saleInvoiceRecord.txt Final sale records (invoices) For each sale: timestamp line; per-item lines “itemId itemName amount extendedPrice”; trailing “Total with tax: <number>”. Blocks separated by newlines. POS.endPOS
returnSale.txt Final return records (unsatisfactory returns) Per return block: blank separator line, then per-item lines “itemId itemName amount extendedPrice”. POH.endPOS when returnSale==true
couponNumber.txt Valid coupon codes One coupon per line; exact string compare. PointOfSale.coupon
temp.txt Temporary transaction state (active transaction) First line: Operation type (“Sale”/“Rental”/“Return”). If Rental/Return, second line: phoneNumber; then lines: “itemId amount” per cart item. PointOfSale.createTemp[](src/PointOfSale.java), [](http://_vscodecontentref_/26)POS.retrieveTemp[](src/POS.java), [](http://_vscodecontentref_/27)POR.retrieveTemp[](src/POR.java), [](http://_vscodecontentref_/28)POH.retrieveTemp[](src/POH.java), [](http://_vscodecontentref_/29)POSSystem.checkTemp[](src/POSSystem.java), [](http://_vscodecontentref_/30)POSSystem.continueFromTemp
Database/newTemp.txt (temp file during edits) Temp rewrite buffer when removing items Same structure as temp.txt; used to rewrite then rename back to temp.txt. POS.deleteTempItem[](src/POS.java), [](http://_vscodecontentref_/31)POR.deleteTempItem[](src/POR.java), [](http://_vscodecontentref_/32)POH.deleteTempItem
Database/newEmployeeDatabase.txt (temp file during edits) Employee DB rewrite buffer Same structure as employeeDatabase.txt; used for add/update/delete operations then renamed. EmployeeManagement.delete[](src/EmployeeManagement.java), [](http://_vscodecontentref_/33)EmployeeManagement.update
Constraints and format notes:

All data files use space-separated tokens; parsing relies on split(" ").
First token is the primary key in most files (username for employees, itemId for inventories, phone for users).
Names cannot contain spaces beyond FirstName and LastName tokens in employeeDatabase.
Dates in userDatabase are stored as MM/dd/yy (parsed with SimpleDateFormat("MM/dd/yy")).
Coupon file is matched by exact string equality per line.
Temp files list operation type and optional phone on the first lines, followed by itemId amount pairs.

### Conceptual Entries

Employee

Stored in: employeeDatabase.txt
Key fields: username, position (Admin/Cashier), firstName, lastName, password
Manipulated by: EmployeeManagement, read also by POSSystem
Item

Stored in: itemDatabase.txt, rentalDatabase.txt
Key fields: itemId, itemName, price, amount (inventory count)
Manipulated by: Inventory[](src/Inventory.java), []PointOfSale, flows POS[](src/POS.java), []POR[](src/POR.java), []POH
User (customer)

Stored in: userDatabase.txt
Key fields: phoneNumber, list of rental entries (itemId, date, returnedFlag)
Manipulated by: Management.checkUser/createUser/addRental/updateRentalStatus/getLatestReturnDate
Rental

Stored in: userDatabase.txt entries per user
Key fields: itemId, rentalDate (MM/dd/yy), returnedFlag
Manipulated by: Management.addRental, consumed by POR.endPOS[](src/POR.java), []POH.endPOS
SessionLog

Stored in: employeeLogfile.txt
Key fields: employee name, username, position, action (login/logout), timestamp yyyy-MM-dd HH:mm:ss.SSS
Manipulated by: POSSystem.logInToFile[](src/POSSystem.java), []POSSystem.logOutToFile
SaleInvoice

Stored in: saleInvoiceRecord.txt
Key fields: timestamp, item lines (itemId, name, amount, extendedPrice), totalWithTax
Manipulated by: POS.endPOS
ReturnRecord

Stored in: returnSale.txt
Key fields: per-item log (itemId, name, amount, extendedPrice); used for unsatisfactory returns
Manipulated by: POH.endPOS when returnSale==true
TempTransaction

Stored in: temp.txt (and rewrite buffers like newTemp.txt)
Key fields: operationType, optional phoneNumber, itemId/amount pairs
Manipulated by: PointOfSale.createTemp[](src/PointOfSale.java), []POS/POR/POH.retrieveTemp[](src/POS.java), []POS/POR/POH.deleteTempItem, orchestrated by POSSystem.checkTemp/continueFromTemp

## Test Inventory and Manual Baseline

### 6. Test Inventory (Legacy)

The legacy project includes a minimal test suite. Tests are located under the `tests/` directory and use JUnit 4.

| Test Class Name   | Purpose / What It Verifies             | Notes / Future Equivalents in MERN                      |
| ----------------- | -------------------------------------- | ------------------------------------------------------- |
| EmployeeTest.java | Getter behavior for the Employee class | Mirror as Jest unit tests for the Employee model/schema |

Notes:

- The legacy project currently includes only EmployeeTest.java which validates basic getter behavior.
- There are no integration tests for POS workflows (Sale, Rental, Return), inventory updates, or file I/O persistence.
- Future work: add API-level integration tests (Jest + Supertest) and service-layer unit tests in the MERN stack.

### Manual Flow

7.1 Admin Login & Employee Management
Input:
Username/password read from employeeDatabase.txt: username position FirstName LastName password
Behavior:
Successful admin login opens Admin UI; login event appended to employeeLogfile.txt; logout writes a corresponding entry.
Add Employee:
Admin “Add Cashier/Admin” creates a new record with incremented numeric username.
Format: newId Cashier|Admin FirstName LastName Password appended to employeeDatabase.txt.
Delete Employee:
Removes matching username from in-memory list; rewrites employeeDatabase.txt via newEmployeeDatabase.txt buffer and rename.
Update Employee:
Validates position in {Admin, Cashier} (or empty to skip).
Applies any non-empty field changes (name/password/position), rewrites employeeDatabase.txt via buffer.
7.2 Cashier Sale Flow
Steps:
Cashier View → “Sale” opens Transaction Interface.
Add items by ID and quantity; cart shows line items and running total.
End Transaction → optional coupon check → Payment View → pay cash/electronic → confirm.
Data effects:
Inventory: itemDatabase.txt amounts decremented.
Invoice: saleInvoiceRecord.txt appended with timestamp, per-item lines, and “Total with tax: …”.
Temp: temp.txt created during cart ops; deleted after finalize.
7.3 Cashier Rental Flow
Steps:
“Rental” prompts for customer phone; validates or auto-creates user in userDatabase.txt.
Add rental items by ID/qty from rentalDatabase.txt.
End Transaction → Payment View → confirm → append return date for UI only; file update happens in logic.
Data effects:
Inventory: rentalDatabase.txt amounts decremented.
User rentals: userDatabase.txt line for the phone updated by appending entries itemId,MM/dd/yy,false.
Temp: temp.txt cleared post finalize.
7.4 Returns Flow (Rental Returns and Unsatisfactory Returns)
Return rented items:

“Return” → choose “Rented Items” → prompt for phone → add items by ID/qty.
Payment View computes fees: per-item late fee

price×qty×0.1×daysLate; finalize.
Data effects (rental return):

Inventory: rentalDatabase.txt amounts incremented.
User rentals: userDatabase.txt updated to mark returned items (flag set to true with current date).
Totals: computed and shown; no saleInvoiceRecord entry for fees.
Temp: temp.txt cleared.
Unsatisfactory (non-rental) returns:

“Return” → choose “Unsatisfactory items” → add items by ID/qty from itemDatabase.txt → finalize immediately (no payment UI).
Data effects (unsatisfactory):

Inventory: itemDatabase.txt amounts incremented.
Return log: returnSale.txt appended with per-item lines and separators.
Temp: temp.txt cleared.
Notes and constraints for all flows:

All legacy data is space-delimited; first token acts as the key (username, phone, itemId).
Names in employee records must be exactly two tokens (First Last).
Phone numbers validated to 10 digits.
Dates for rentals in userDatabase.txt are stored as MM/dd/yy.
