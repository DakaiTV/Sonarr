import React, { Component, PropTypes } from 'react';
import inputTypes from 'Utilities/inputTypes';
import { kinds } from 'Helpers/Props';
import { boolSettingShape, numberSettingShape, tagSettingShape } from 'Helpers/Props/settingShape';
import Button from 'Components/Button';
import LoadingIndicator from 'Components/LoadingIndicator';
import Alert from 'Components/Alert';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import styles from './EditDelayProfileModalContent.css';

class EditDelayProfileModalContent extends Component {

  //
  // Render

  render() {
    const {
      id,
      fetching,
      error,
      item,
      protocol,
      protocolOptions,
      onInputChange,
      onProtocolChange,
      onSavePress,
      onModalClose,
      onDeleteDelayProfilePress,
      ...otherProps
    } = this.props;

    const {
      enableUsenet,
      enableTorrent,
      usenetDelay,
      torrentDelay,
      tags
    } = item;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {id ? 'Edit Delay Profile' : 'Add Delay Profile'}
        </ModalHeader>

        <ModalBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            !fetching && !!error &&
              <div>Unable to add a new quality profile, please try again.</div>
          }

          {
            !fetching && !error &&
              <Form
                {...otherProps}
              >
                <FormGroup>
                  <FormLabel>Protocol</FormLabel>

                  <FormInputGroup
                    type={inputTypes.SELECT}
                    name="protocol"
                    value={protocol}
                    values={protocolOptions}
                    helpText="Choose which protocol(s) to use and which one is preferred when choosing between otherwise equal releases"
                    onChange={onProtocolChange}
                  />
                </FormGroup>

                {
                  enableUsenet.value &&
                    <FormGroup>
                      <FormLabel>Usenet Delay</FormLabel>

                      <FormInputGroup
                        type={inputTypes.NUMBER}
                        name="usenetDelay"
                        {...usenetDelay}
                        helpText="Delay in minutes to wait before grabbing a release from Usenet"
                        onChange={onInputChange}
                      />
                    </FormGroup>
                }

                {
                  enableTorrent.value &&
                    <FormGroup>
                      <FormLabel>Torrent Delay</FormLabel>

                      <FormInputGroup
                        type={inputTypes.NUMBER}
                        name="torrentDelay"
                        {...torrentDelay}
                        helpText="Delay in minutes to wait before grabbing a torrent"
                        onChange={onInputChange}
                      />
                    </FormGroup>
                }

                {
                  id === 1 ?
                    <Alert>
                      This is the default profile. It applies to all series that don't have an explicit profile.
                    </Alert> :

                    <FormGroup>
                      <FormLabel>Tags</FormLabel>

                      <FormInputGroup
                        type={inputTypes.TAG}
                        name="tags"
                        {...tags}
                        helpText="Delay in minutes to wait before grabbing a torrent"
                        onChange={onInputChange}
                      />
                    </FormGroup>
                }
              </Form>
          }
        </ModalBody>
        <ModalFooter>
          {
            id && id > 1 &&
              <Button
                className={styles.deleteButton}
                kind={kinds.DANGER}
                onPress={onDeleteDelayProfilePress}
              >
                Delete
              </Button>
          }

          <Button
            onPress={onModalClose}
          >
            Cancel
          </Button>

          <Button
            onPress={onSavePress}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

const delayProfileShape = {
  enableUsenet: PropTypes.shape(boolSettingShape).isRequired,
  enableTorrent: PropTypes.shape(boolSettingShape).isRequired,
  usenetDelay: PropTypes.shape(numberSettingShape).isRequired,
  torrentDelay: PropTypes.shape(numberSettingShape).isRequired,
  order: PropTypes.shape(numberSettingShape),
  tags: PropTypes.shape(tagSettingShape).isRequired
};

EditDelayProfileModalContent.propTypes = {
  id: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  item: PropTypes.shape(delayProfileShape).isRequired,
  protocol: PropTypes.string.isRequired,
  protocolOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onProtocolChange: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteDelayProfilePress: PropTypes.func
};

export default EditDelayProfileModalContent;
