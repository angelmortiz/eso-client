import IncrementalInput from '../../../UI/Selects/IncrementalInput';
import styles from '../../../UI/General/CSS/Form.module.css';
import { postPhysicalCondition } from '../../../../util/apis/activities/physicalConditions/physicalConditionsApis';

const AddPhysicalCondition = props => {
    /** Fields Data */
    const symptomsInfo = {
        input: {
            id: "physicalCondition-symptoms",
            name: "symptoms",
            placeholder: "Enter a new symptom..."
        },
        button: {
            id: "add-symptom-btn",
            label: "Add symptom"
        }
    }

    const causesInfo = {
        input: {
            id: "physicalCondition-causes",
            name: "causes",
            placeholder: "Enter a new causes..."
        },
        button: {
            id: "add-causes-btn",
            label: "Add causes"
        }
    }

    const treatmentsInfo = {
        input: {
            id: "physicalCondition-treatments",
            name: "treatments",
            placeholder: "Enter a new treatment..."
        },
        button: {
            id: "add-treatment-btn",
            label: "Add treatment"
        }
    }

    const testsInfo = {
        input: {
            id: "physicalCondition-tests",
            name: "tests",
            placeholder: "Enter a new test..."
        },
        button: {
            id: "add-test-btn",
            label: "Add test"
        }
    }

    /** Functions */
    const addPhysicalCondition = (e) => {
        e.preventDefault();
        const formVals = getFormValues(e.target.elements);
        // console.log("value: ", formVals);
        postPhysicalCondition(formVals).then(response => { 
            //console.log("Response: ", response);
        });
    };

    const getFormValues = (elements) => {
        const values = {};
        values.name = elements.name.value;
        values.description = elements.description.value;

        //multi-select options
        values.symptoms = extractMultiTextValues(elements.symptoms);
        values.causes = extractMultiTextValues(elements.causes);
        values.treatments = extractMultiTextValues(elements.treatments);
        values.tests = extractMultiTextValues(elements.tests);
        return values;
    };

    const extractMultiTextValues = (elements) => {
        //if there is only one text field, it adds the HTMLInputElement to an array before extracting the value.
        //if there are multiple text fields, converts the RadioNodeList into an array (to later use .map()).
        elements = Object.prototype.toString.call(elements).includes('HTMLInputElement') ?
            [elements] : [...elements];
        
        let values = elements.map(element => { return element.value; });
        values = values.filter(v => v); //removes empty selections
        values = [...new Set(values)]; //removes duplicate values
        return values;
    };

    /** Render */
    return <section className={styles['main-section']}>
        <form id="add-physicalCondition-form"  onSubmit={addPhysicalCondition} className={styles['main-form']}>
            <h1 className={styles['form-title']}>Add Physical Condition</h1>
            
            {/* NAME */}
            <label htmlFor="physicalCondition-name" className={styles['text-label']}>Name:</label>
            <input type="text" id="physicalCondition-name" name="name"
                placeholder='Enter the physical condition name...' className={styles['select-input']}/>

            {/* DESCRIPTION */}
            <label htmlFor="physicalCondition-description" className={styles['text-label']}>Description:</label>
            <input type="text" id="physicalCondition-description" name="description"
                placeholder='Enter the physical condition description...'className={styles['select-input']} />

            {/* SYMPTOMS */}
            <label htmlFor="physicalCondition-symptoms" className={styles['text-label']}>Symptoms:</label>
            <IncrementalInput input={symptomsInfo}/>

            {/* CAUSES */}
            <label htmlFor="physicalCondition-causes" className={styles['text-label']}>Causes:</label>
            <IncrementalInput input={causesInfo}/>

            {/* TREATMENTS */}
            <label htmlFor="physicalCondition-treatments" className={styles['text-label']}>Treatments:</label>
            <IncrementalInput input={treatmentsInfo}/>

            {/* TESTS */}
            <label htmlFor="physicalCondition-tests" className={styles['text-label']}>Tests:</label>
            <IncrementalInput input={testsInfo}/>

            {/* SUBMIT BUTTON */}
            <button type="submit" id="add-exercse-btn" className={styles['submit-btn']}>Add Physical Condition</button>
        </form>
    </section>
};

export default AddPhysicalCondition;