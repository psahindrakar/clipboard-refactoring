Ticket breakdown task:

1. Create Agent and Facility map table i.e FacilityAgentMap
- Assuming that one agent can work for multiple facilities
- The facility-specific custom agentId can not be stored in the Agent table
- So we need to introduce a mapping table i.e. FacilityAgentMap {
    agentId
    facilityId
    customAgentId
}
- By default agentId itself can be considered as customAgentId for the initial release
- Estimated time: 4h
    - Creating the table model


2. Populate FacilityAgentMap from existing shift data
- The existing shift data has information about agents working for the facility
- The agentId and facilityId along with customAgentId=agentId can be populated in the new table
- This will be a one-time activity and an external script can be written for the same
- Estimated time: 16h
    - The script writing
    - The script testing on dev DB


3. Update the existing getShiftsByFacility function to use customAgentId
- In the getShiftsByFacility function the part where the agent information is added needs to consider the new FacilityAgentMap table to include customAgentId
- The query needs to be modified there
- The output should be updated such that the agentId is equal customAgentId from the FacilityAgentMap table so that the report generating function does not have to change i.e. generateReport need not be changed
- Estimated time: 8h