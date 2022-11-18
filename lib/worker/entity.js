// Copyright 2022 ODK Central Developers
// See the NOTICE file at the top-level directory of this distribution and at
// https://github.com/getodk/central-backend/blob/master/NOTICE.
// This file is part of ODK Central. It is subject to the license terms in
// the LICENSE file found in the top-level directory of this distribution and at
// https://www.apache.org/licenses/LICENSE-2.0. No part of ODK Central,
// including this file, may be copied, modified, propagated, or distributed
// except according to the terms contained in the LICENSE file.

const createEntityFromSubmission = ({ Audits, Entities }, event) => {
  if (event.details.reviewState === 'approved' && event.details.submissionDefId) {
    return Entities.processSubmissionDef(event.details.submissionDefId)
      .then((entity) => {
        Audits.log({ id: event.actorId }, 'entity.create', { acteeId: entity.aux.dataset.acteeId },
          { entity: { uuid: entity.uuid, label: entity.label, dataset: entity.aux.dataset.name },
            submissionId: event.details.submissionId,
            submissionDefId: event.details.submissionDefId });
      })
      .catch((problem) => {
        Audits.log({ id: event.actorId }, 'entity.create.error', null,
          { submissionId: event.details.submissionId,
            submissionDefId: event.details.submissionDefId,
            problem });
      });
  }
};

module.exports = { createEntityFromSubmission };
